# Behobene Bugs - Academy

## 2024-12-09: /welcome Redirect Loop nach Registrierung

### Problem
Nach neuer Registrierung wurde der User kurz auf `/welcome` geleitet, aber dann sofort zu Clerk's Hosted Sign-In (`https://proven-koala-23.accounts.dev/sign-in`) redirected.

### Ursache
Die `/welcome` Route war nicht in den protected routes der Middleware enthalten. Nur `/dashboard(.*)` war geschützt.

**Was passierte:**
1. User registriert sich erfolgreich
2. Session wird erstellt, `router.push('/welcome')` wird aufgerufen
3. User landet auf `/welcome`, aber die Session war noch nicht vollständig synchronisiert
4. Clerk's Default-Verhalten: Wenn `useUser()` Hook aufgerufen wird und Session nicht vollständig geladen ist, redirected Clerk zum hosted sign-in
5. `CompleteStep.tsx` verwendet `useUser()` Hook

### Lösung
`/welcome` zu den protected routes in der Middleware hinzugefügt:

```typescript
// src/middleware.ts
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/welcome'])
```

**Warum das funktioniert:**
- Die Middleware prüft die Auth BEVOR die Seite gerendert wird
- Clerk wartet auf die vollständige Session-Synchronisierung
- Der User wird erst zur `/welcome` Seite durchgelassen, wenn die Session vollständig etabliert ist
- Dadurch funktioniert `useUser()` korrekt ohne Race Condition

### Betroffene Dateien
- `src/middleware.ts` - Route zu protected routes hinzugefügt

### Prävention
Bei neuen geschützten Seiten immer prüfen, ob sie in der Middleware als protected route eingetragen sind, besonders wenn sie Clerk-Hooks wie `useUser()`, `useAuth()` etc. verwenden.
