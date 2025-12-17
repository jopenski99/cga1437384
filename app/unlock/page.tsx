"use client";

import { useAppLock } from "@/lib/providers/AppLockProvider";

export default function UnlockPage() {
  const { unlock } = useAppLock();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Asset Manager</h1>

        <button
          onClick={unlock}
          className="px-6 py-3 bg-black text-white rounded"
        >
          Unlock with Biometrics
        </button>
      </div>
    </main>
  );
}
