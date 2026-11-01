import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as fbSignOut,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export interface AuthHelpInfo {
  code: string;
  message: string;
  isProviderDisabled?: boolean;
  canSendResetLink?: boolean;
  emailTarget?: string;
  consoleUrl?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  activeAdminEmail: string | null;
  authError: string | null;
  authSuccess: string | null;
  authHelp: AuthHelpInfo | null;
  isAuthenticating: boolean;
  signInWithEmail: (email: string, pass: string) => Promise<boolean>;
  sendPasswordReset: (email: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  clearAuthMessages: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Specifically authorized administrator accounts for Vistiria Properties
export const AUTHORIZED_ADMIN_EMAILS = [
  'vistiria.properties@gmail.com',
  't4990418@gmail.com',
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [activeAdminEmail, setActiveAdminEmail] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [authHelp, setAuthHelp] = useState<AuthHelpInfo | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  // Helper to verify administrator privileges via server-side custom claims, email verification, or admin document
  const verifyAdminPrivileges = async (currentUser: User): Promise<boolean> => {
    try {
      const emailLower = (currentUser.email || '').toLowerCase().trim();

      // 1. Check server-side custom claims via force-refreshed ID token
      const tokenResult = await currentUser.getIdTokenResult(true);
      if (tokenResult.claims && tokenResult.claims.admin === true) {
        return true;
      }

      // 2. Check if user email is in the authorized admin list
      const isEmailAuthorized = AUTHORIZED_ADMIN_EMAILS.some(
        (adminEmail) => adminEmail.toLowerCase() === emailLower
      );

      if (isEmailAuthorized) {
        // Automatically sync admin document in Firestore for backend security rules
        try {
          await setDoc(
            doc(db, 'admins', currentUser.uid),
            {
              email: emailLower,
              role: 'admin',
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          );
        } catch {
          // If Firestore write fails, the email list check still grants authenticated access
        }
        return true;
      }

      // 3. Check trusted server-side document in /admins/{uid}
      const adminDoc = await getDoc(doc(db, 'admins', currentUser.uid));
      if (adminDoc.exists() && adminDoc.data()?.role === 'admin') {
        return true;
      }

      return false;
    } catch (err) {
      console.error('Error verifying administrator permissions:', err);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const authorized = await verifyAdminPrivileges(currentUser);
        if (authorized) {
          setIsAdmin(true);
          setActiveAdminEmail(currentUser.email);
        } else {
          // If authenticated user is NOT an authorized administrator, immediately revoke access and sign out
          await fbSignOut(auth);
          setIsAdmin(false);
          setActiveAdminEmail(null);
          setAuthError(
            `Access Denied: The account "${currentUser.email}" is not an authorized administrator. Public registration or customer accounts cannot access the admin console.`
          );
        }
      } else {
        setIsAdmin(false);
        setActiveAdminEmail(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, pass: string): Promise<boolean> => {
    try {
      setIsAuthenticating(true);
      setAuthError(null);
      setAuthSuccess(null);
      setAuthHelp(null);

      const trimmedEmail = email.trim();
      if (!trimmedEmail) {
        setAuthError('Please enter your administrator email address.');
        return false;
      }
      if (!pass) {
        setAuthError('Please enter your administrator password.');
        return false;
      }

      // Check if email belongs to authorized administrator list before proceeding
      const isEmailAuthorized = AUTHORIZED_ADMIN_EMAILS.some(
        (adminEmail) => adminEmail.toLowerCase() === trimmedEmail.toLowerCase()
      );

      if (!isEmailAuthorized) {
        setAuthError(
          `Unauthorized: "${trimmedEmail}" is not an authorized administrator email. Public registration is not allowed.`
        );
        return false;
      }

      // Set persistence to LOCAL so session survives page refresh and tab switching
      await setPersistence(auth, browserLocalPersistence);

      // Authenticate with Firebase Email and Password
      let userCredential;
      try {
        userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, pass);
      } catch (signInErr: unknown) {
        const isFirebaseError = typeof signInErr === 'object' && signInErr !== null && 'code' in signInErr;
        const errCode = isFirebaseError ? String((signInErr as { code: string }).code) : '';

        // If the account does not exist or has invalid credentials, and email is an authorized administrator:
        // Try initializing the authorized admin account with this password
        if (errCode === 'auth/invalid-credential' || errCode === 'auth/user-not-found') {
          try {
            const { createUserWithEmailAndPassword } = await import('firebase/auth');
            userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, pass);
            console.log('Authorized administrator account created successfully.');
          } catch (createErr: unknown) {
            const isCreateFbErr = typeof createErr === 'object' && createErr !== null && 'code' in createErr;
            const createErrCode = isCreateFbErr ? String((createErr as { code: string }).code) : '';

            if (createErrCode === 'auth/email-already-in-use') {
              // The account already exists in Firebase (e.g. created previously via Google Sign-in or console)
              // but password is wrong or not yet set
              setAuthError(
                `The administrator account "${trimmedEmail}" exists in Firebase, but the password was not recognized. If you previously signed in via Google or need to set your password, click "Email Me a Password Setup Link" below.`
              );
              setAuthHelp({
                code: 'auth/invalid-credential',
                message: 'Account exists without this password.',
                canSendResetLink: true,
                emailTarget: trimmedEmail,
                consoleUrl:
                  'https://console.firebase.google.com/project/vistiria-properties-3f115/authentication/users',
              });
              return false;
            } else if (createErrCode === 'auth/operation-not-allowed') {
              setAuthError(
                'Email/Password authentication provider is not enabled in your Firebase Console. Please open Firebase Console > Authentication > Sign-in method, click "Email/Password", and toggle "Enable" to ON.'
              );
              setAuthHelp({
                code: 'auth/operation-not-allowed',
                message: 'Email/Password provider is disabled in Firebase Console.',
                isProviderDisabled: true,
                consoleUrl:
                  'https://console.firebase.google.com/project/vistiria-properties-3f115/authentication/providers',
              });
              return false;
            } else if (createErrCode === 'auth/weak-password') {
              setAuthError('Password is too weak. Please use at least 6 characters.');
              return false;
            } else {
              // Re-throw sign-in error
              throw signInErr;
            }
          }
        } else {
          throw signInErr;
        }
      }

      const authorized = await verifyAdminPrivileges(userCredential.user);

      if (!authorized) {
        await fbSignOut(auth);
        setAuthError(
          'Access Denied: Your account does not have administrator privileges in this project.'
        );
        return false;
      }

      setIsAdmin(true);
      setActiveAdminEmail(userCredential.user.email);
      setAuthSuccess('Administrator authenticated successfully.');
      return true;
    } catch (err: unknown) {
      console.error('Email sign-in error:', err);
      const isFirebaseError = typeof err === 'object' && err !== null && 'code' in err;
      const errorCode = isFirebaseError ? String((err as { code: string }).code) : 'auth/unknown';
      const rawMessage = err instanceof Error ? err.message : 'Authentication failed';

      let userFriendlyMessage = 'Authentication failed. Please verify your administrator credentials and retry.';
      let isProviderDisabled = false;
      let canSendResetLink = false;

      if (errorCode === 'auth/operation-not-allowed') {
        userFriendlyMessage =
          'Email/Password authentication is currently not enabled in your Firebase Console. Please open Firebase Console, navigate to Authentication > Sign-in method, and enable "Email/Password".';
        isProviderDisabled = true;
      } else if (
        errorCode === 'auth/invalid-credential' ||
        errorCode === 'auth/wrong-password' ||
        errorCode === 'auth/user-not-found'
      ) {
        userFriendlyMessage =
          'Invalid administrator email or password. If you previously used Google Sign-In or have not created a password yet, please click "Email Me a Password Setup Link" below.';
        canSendResetLink = true;
      } else if (errorCode === 'auth/too-many-requests') {
        userFriendlyMessage =
          'Access to this account has been temporarily disabled due to multiple failed login attempts. You can restore access immediately by resetting your password.';
        canSendResetLink = true;
      } else if (errorCode === 'auth/invalid-email') {
        userFriendlyMessage = 'The email address format is invalid.';
      } else if (errorCode === 'auth/network-request-failed') {
        userFriendlyMessage = 'Network request failed. Please check your internet connection and try again.';
      }

      setAuthError(userFriendlyMessage);
      setAuthHelp({
        code: errorCode,
        message: rawMessage,
        isProviderDisabled,
        canSendResetLink,
        emailTarget: email.trim(),
        consoleUrl: isProviderDisabled
          ? 'https://console.firebase.google.com/project/vistiria-properties-3f115/authentication/providers'
          : 'https://console.firebase.google.com/project/vistiria-properties-3f115/authentication/users',
      });
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const sendPasswordReset = async (email: string): Promise<boolean> => {
    try {
      setIsAuthenticating(true);
      setAuthError(null);
      setAuthSuccess(null);
      setAuthHelp(null);

      const trimmedEmail = email.trim();
      if (!trimmedEmail) {
        setAuthError('Please enter your administrator email address to receive a password reset link.');
        return false;
      }

      // Check authorization
      const isEmailAuthorized = AUTHORIZED_ADMIN_EMAILS.some(
        (adminEmail) => adminEmail.toLowerCase() === trimmedEmail.toLowerCase()
      );

      if (!isEmailAuthorized) {
        setAuthError(
          `Unauthorized: Password reset is restricted to authorized administrator accounts.`
        );
        return false;
      }

      await sendPasswordResetEmail(auth, trimmedEmail);
      setAuthSuccess(
        `A password reset link has been dispatched to ${trimmedEmail}. Please check your inbox and follow the link to set your password.`
      );
      return true;
    } catch (err: unknown) {
      console.error('Password reset error:', err);
      const isFirebaseError = typeof err === 'object' && err !== null && 'code' in err;
      const errorCode = isFirebaseError ? String((err as { code: string }).code) : 'auth/unknown';
      const rawMessage = err instanceof Error ? err.message : 'Password reset failed';

      let userFriendlyMessage = 'Failed to send password reset email. Please try again.';
      if (errorCode === 'auth/user-not-found') {
        userFriendlyMessage =
          `No user account found with email "${email}". Please ensure the user has been created in Firebase Console under Authentication > Users.`;
      } else if (errorCode === 'auth/invalid-email') {
        userFriendlyMessage = 'The email address format is invalid.';
      } else if (errorCode === 'auth/operation-not-allowed') {
        userFriendlyMessage =
          'Email/Password provider is disabled in Firebase Console. Please enable it under Authentication > Sign-in method.';
      }

      setAuthError(userFriendlyMessage);
      setAuthHelp({
        code: errorCode,
        message: rawMessage,
        consoleUrl:
          'https://console.firebase.google.com/project/vistiria-properties-3f115/authentication/users',
      });
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
    } catch (err) {
      console.error('Sign-out error:', err);
    }
    setIsAdmin(false);
    setActiveAdminEmail(null);
    setAuthError(null);
    setAuthSuccess(null);
    setAuthHelp(null);
  };

  const clearAuthMessages = () => {
    setAuthError(null);
    setAuthSuccess(null);
    setAuthHelp(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        activeAdminEmail,
        authError,
        authSuccess,
        authHelp,
        isAuthenticating,
        signInWithEmail,
        sendPasswordReset,
        signOut,
        clearAuthMessages,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
