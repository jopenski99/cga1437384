"use client";

import { useAppLock } from "@/lib/providers/AppLockProvider";
import { biometricUnlock, hasPasskey, setupPasskey } from "@/lib/security/biometric";

export default function UnlockPage() {
  const { unlock } = useAppLock();

  async function handleBiometricUnlock() {

    if (!hasPasskey()) {
      const created = await setupPasskey();
      if (!created) return;
    }

    const success = await biometricUnlock();
    if (success) {
      console.log("Biometric auth succeeded");
      unlock();
    } else {
      alert("Biometric authentication failed");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Asset Manager</h1>

        <button
          onClick={handleBiometricUnlock}
          className="px-6 py-3 bg-black text-white rounded"
        >
          Unlock with Biometrics
        </button>
      </div>
    </main>
  );
}
