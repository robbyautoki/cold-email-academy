# Behobene Bugs - Academy

## 2024-12-09: Google SSO Redirect zu Clerk Hosted Sign-In

### Problem
Nach Google-Registrierung wurde der User zu Clerk's Hosted Sign-In (`https://proven-koala-23.accounts.dev/sign-in`) redirected statt zur App.

### Ursache
1. **Falscher OAuth-Handler:** `signUp.authenticateWithRedirect` wurde für Google OAuth verwendet, aber das funktioniert nur für reine Sign-Ups. Für bestehende User oder den allgemeinen Flow sollte `signIn.authenticateWithRedirect` verwendet werden.
2. **React Strict Mode:** Der SSO-Callback wurde doppelt ausgeführt

### Lösung
1. In `login-form.tsx` von `signUp` auf `signIn` gewechselt:
```typescript
// VORHER (falsch):
await signUp.authenticateWithRedirect({...})

// NACHHER (richtig):
await signIn.authenticateWithRedirect({
  strategy: 'oauth_google',
  redirectUrl: '/sso-callback',
  redirectUrlComplete: '/sso-callback',
})
```

2. In `sso-callback/page.tsx` einen `useRef` Guard gegen doppelte Ausführung hinzugefügt

### Betroffene Dateien
- `src/components/shadcn-studio/blocks/login-page-03/login-form.tsx`
- `src/app/sso-callback/page.tsx`

---

## 2024-12-09: /welcome Redirect Loop nach Email-Registrierung

### Problem
Nach neuer Email-Registrierung wurde der User kurz auf `/welcome` geleitet, aber dann sofort zu Clerk's Hosted Sign-In redirected.

### Ursache
Die `/welcome` Route war nicht in den protected routes der Middleware enthalten.

### Lösung
`/welcome` zu den protected routes in der Middleware hinzugefügt:

```typescript
// src/middleware.ts
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/welcome'])
```

### Betroffene Dateien
- `src/middleware.ts`

### Prävention
Bei neuen geschützten Seiten immer prüfen, ob sie in der Middleware als protected route eingetragen sind, besonders wenn sie Clerk-Hooks wie `useUser()`, `useAuth()` etc. verwenden.
