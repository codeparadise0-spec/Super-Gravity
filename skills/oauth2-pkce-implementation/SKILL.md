---
name: oauth2-pkce-implementation
description: Use when implementing OAuth 2.0 with Proof Key for Code Exchange (PKCE) for Single Page Apps and mobile clients, code verifiers, and secure token exchange.
---

# OAuth 2.0 with PKCE (Proof Key for Code Exchange)

PKCE (RFC 7636) prevents authorization code interception attacks in public clients (Single Page Apps, React Native, electron) that cannot securely store client secrets.

---

## 1. The PKCE Cryptographic Flow

```
1. Client generates high-entropy random `code_verifier` (43-128 chars)
2. Client computes SHA-256 hash: `code_challenge = BASE64URL(SHA256(code_verifier))`
3. Client redirects to Auth Provider with `code_challenge` and `code_challenge_method=S256`
4. User logs in; Auth Provider redirects back with `auth_code`
5. Client requests token exchange sending `auth_code` + original plaintext `code_verifier`
6. Auth Provider hashes `code_verifier` and validates against stored `code_challenge`
```

---

## 2. JavaScript / Browser Implementation

```typescript
// 1. Generate random code verifier
function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// 2. Generate SHA-256 code challenge
async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// 3. Initiate Auth Redirect
export async function startOAuthFlow() {
  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);

  // Store verifier in sessionStorage for callback exchange
  sessionStorage.setItem('oauth_verifier', verifier);

  const authUrl = `https://auth.example.com/oauth/authorize?` +
    `response_type=code` +
    `&client_id=my_client_id` +
    `&redirect_uri=${encodeURIComponent('https://app.example.com/callback')}` +
    `&code_challenge=${challenge}` +
    `&code_challenge_method=S256` +
    `&scope=openid%20profile%20email`;

  window.location.href = authUrl;
}
```
