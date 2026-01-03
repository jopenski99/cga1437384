import { StoredPasskey } from "../models/pass";

export async function biometricUnlock(): Promise<boolean> {
  if (typeof window === "undefined" || !("PublicKeyCredential" in window)) {
    alert("Biometrics not supported on this device");
    return false;
  }

  try {
    const challenge = crypto.getRandomValues(new Uint8Array(32));

    const assertion = await navigator.credentials.get({
      publicKey: {
        challenge,
        timeout: 60_000,
        userVerification: "required", // 👈 forces biometrics
      },
    });

    return !!assertion;
  } catch (err) {
    console.error("Biometric auth failed", err);
    return false;
  }
}

// lib/services/webauthnUtils.ts

export function bufferToBase64(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

export function base64ToBuffer(base64: string): ArrayBuffer {
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  return bytes.buffer;
}

// lib/services/passkeySetup.ts

export function hasPasskey(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(STORAGE_KEY);
}

const STORAGE_KEY = "asset-manager-passkey";

export async function setupPasskey(): Promise<boolean> {
  if (typeof window === "undefined" || !("PublicKeyCredential" in window)) {
    alert("Passkeys are not supported on this device.");
    return false;
  }

  try {
    const challenge = crypto.getRandomValues(new Uint8Array(32));
    const userId = crypto.getRandomValues(new Uint8Array(16));

    const credential = await navigator.credentials.create({
      publicKey: {
        challenge,
        rp: {
          name: "Asset Manager",
        },
        user: {
          id: userId,
          name: "local-user",
          displayName: "Asset Manager User",
        },
        pubKeyCredParams: [
          { type: "public-key", alg: -7 }, // ES256
        ],
        authenticatorSelection: {
          userVerification: "required", // 👈 forces biometrics
          residentKey: "required",
        },
        timeout: 60_000,
      },
    });

    if (!credential) return false;

    const publicKeyCred = credential as PublicKeyCredential;

    const stored: StoredPasskey = {
      credentialId: bufferToBase64(publicKeyCred.rawId),
      createdAt: Date.now(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));

    return true;
  } catch (err) {
    console.error("Passkey setup failed:", err);
    return false;
  }
}
