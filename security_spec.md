# Security Specification & Test Protocol

## 1. Data Invariants

1. **Global Default Deny**: All unmatched collections and documents are closed to any read or write operation.
2. **Property Integrity**:
   - Properties are publicly readable by any visitor to browse luxury listings.
   - Property documents can ONLY be created, updated, or deleted by authenticated administrators (`isAdmin()`).
   - Title, location, price, and configuration must adhere to maximum length and structural constraints.
3. **Inquiry Submissions (Leads & Site Visits)**:
   - Prospective clients (authenticated or anonymous visitors) may create a new inquiry with validated parameters.
   - The initial status must be strictly `'pending'`.
   - Inquiries cannot be updated or modified by unprivileged visitors.
   - An inquiry can only be read by the designated admin or the authenticated user who created it (`resource.data.userId == request.auth.uid`).
   - Only administrators can update the status (e.g., `'contacted'`, `'scheduled'`, `'closed'`) or delete inquiries.
4. **Admin Protection & Identity Spoofing**:
   - Nobody can self-assign the admin role.
   - The `/admins/{adminId}` documents are restricted to existing authorized admins or verified admin email match (`t4990418@gmail.com`).

---

## 2. The Dirty Dozen Payloads (Designed to Fail)

1. **Ghost Field in Inquiry**: Anonymous user creates inquiry with extra field `isVipClient: true`. Expect: PERMISSION_DENIED.
2. **Invalid Initial Status**: Anonymous user creates inquiry with `status: 'closed'`. Expect: PERMISSION_DENIED.
3. **Oversized Name**: User creates inquiry with `fullName` exceeding 120 characters. Expect: PERMISSION_DENIED.
4. **Unauthorized Property Write**: Unauthenticated visitor attempts to `create` or `delete` `/properties/prop-1`. Expect: PERMISSION_DENIED.
5. **Non-Admin Property Mutation**: Standard authenticated user attempts to change property price. Expect: PERMISSION_DENIED.
6. **Inquiry Snooping**: Unauthenticated or non-owner user attempts to `get` another buyer's `/inquiries/inq-123`. Expect: PERMISSION_DENIED.
7. **Unrestricted List Queries**: Client attempts blanket `list` on `/inquiries` without admin role. Expect: PERMISSION_DENIED.
8. **Malicious Path Injection**: User targets `/properties/../` or invalid ID with special characters. Expect: PERMISSION_DENIED.
9. **Self-Promotion to Admin**: Non-admin attempts to create `/admins/{uid}` with `role: 'admin'`. Expect: PERMISSION_DENIED.
10. **Inquiry Update Gap**: User tries to update their own inquiry's message after submission. Expect: PERMISSION_DENIED.
11. **Negative Price on Property**: Admin or attacker sends negative numeric price or invalid type. Expect: PERMISSION_DENIED.
12. **Catch-All Probe**: Attacker attempts to read or write to arbitrary collection `/secret_data/key`. Expect: PERMISSION_DENIED.
