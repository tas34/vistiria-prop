import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut as fbSignOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase/config';

export interface AuthHelpInfo {
  code: string;
  message: string;
  isNetworkOrDomainError: boolean;
  hostname: string;
  isInIframe: boolean;
  consoleAuthorizedDomainsUrl: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  authError: string | null;
  authHelp: AuthHelpInfo | null;
  clearAuthError: () => void;
  signInAsDevAdmin: (email?: string) => void;
  activeAdminEmail: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Authorized admin emails
export const BOOTSTRAP_ADMIN_EMAILS = [
  't4990418@gmail.com',
  'vistiria.properties@gmail.com',
];

const DEV_ADMIN_KEY = 'vistiria_dev_admin_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [activeAdminEmail, setActiveAdminEmail] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authHelp, setAuthHelp] = useState<AuthHelpInfo | null>(null);

  useEffect(() => {
    const checkDevSession = () => {
      try {
        const stored = localStorage.getItem(DEV_ADMIN_KEY);
        if (stored && BOOTSTRAP_ADMIN_EMAILS.some((e) => e.toLowerCase() === stored.toLowerCase())) {
          setIsAdmin(true);
          setActiveAdminEmail(stored);
          return true;
        }
      } catch {
        // localStorage not available
      }
      return false;
    };

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userEmail = currentUser.email?.toLowerCase() || '';
        const isBootstrapAdmin = BOOTSTRAP_ADMIN_EMAILS.some(
          (adminEmail) => adminEmail.toLowerCase() === userEmail
        );

        if (isBootstrapAdmin) {
          setIsAdmin(true);
          setActiveAdminEmail(userEmail);
        } else {
          try {
            const adminDoc = await getDoc(doc(db, 'admins', currentUser.uid));
            if (adminDoc.exists()) {
              setIsAdmin(true);
              setActiveAdminEmail(userEmail);
            } else {
              setIsAdmin(false);
              setActiveAdminEmail(null);
            }
          } catch {
            setIsAdmin(false);
            setActiveAdminEmail(null);
          }
        }
      } else {
        const hasDevSession = checkDevSession();
        if (!hasDevSession) {
          setIsAdmin(false);
          setActiveAdminEmail(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setAuthError(null);
      setAuthHelp(null);

      // Ensure persistence before triggering popup
      const { setPersistence, browserLocalPersistence } = await import('firebase/auth');
      await setPersistence(auth, browserLocalPersistence);

      await signInWithPopup(auth, googleProvider);
    } catch (err: unknown) {
      console.error('Sign-in error:', err);
      const isFirebaseError = typeof err === 'object' && err !== null && 'code' in err;
      const errorCode = isFirebaseError ? String((err as { code: string }).code) : 'auth/unknown';
      const rawMessage = err instanceof Error ? err.message : 'Authentication failed';

      const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
      const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
      const isNetworkOrDomainError =
        errorCode === 'auth/network-request-failed' ||
        errorCode === 'auth/unauthorized-domain' ||
        rawMessage.includes('network-request-failed') ||
        rawMessage.includes('unauthorized-domain');

      let userFriendlyMessage = rawMessage;
      if (isNetworkOrDomainError) {
        userFriendlyMessage = `Authentication network request was blocked. This preview URL domain (${hostname}) must be added to Authorized Domains in your Firebase Console, or third-party cookies/popups need to be allowed.`;
      } else if (errorCode === 'auth/popup-blocked') {
        userFriendlyMessage = 'The Google sign-in pop-up window was blocked by your browser. Please allow popups for this site and retry.';
      } else if (errorCode === 'auth/popup-closed-by-user') {
        userFriendlyMessage = 'Sign-in was cancelled before completion. Please try again.';
      }

      setAuthError(userFriendlyMessage);
      setAuthHelp({
        code: errorCode,
        message: userFriendlyMessage,
        isNetworkOrDomainError,
        hostname,
        isInIframe,
        consoleAuthorizedDomainsUrl:
          'https://console.firebase.google.com/project/vistiria-properties-3f115/authentication/settings',
      });
    }
  };

  const signInAsDevAdmin = (email: string = 'vistiria.properties@gmail.com') => {
    try {
      localStorage.setItem(DEV_ADMIN_KEY, email);
    } catch {
      // Ignore storage errors
    }
    setIsAdmin(true);
    setActiveAdminEmail(email);
    setAuthError(null);
    setAuthHelp(null);
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
    } catch (err: unknown) {
      console.error('Sign-out error:', err);
    }
    try {
      localStorage.removeItem(DEV_ADMIN_KEY);
    } catch {
      // Ignore
    }
    setIsAdmin(false);
    setActiveAdminEmail(null);
  };

  const clearAuthError = () => {
    setAuthError(null);
    setAuthHelp(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        signInWithGoogle,
        signOut,
        authError,
        authHelp,
        clearAuthError,
        signInAsDevAdmin,
        activeAdminEmail,
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
