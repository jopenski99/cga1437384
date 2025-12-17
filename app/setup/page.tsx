"use client";

import { useRouter } from "next/navigation";
import { saveEncryptedMasterKey } from "@/lib/storage/db";

export default function SetupPage() {
  const router = useRouter();

  async function handleSetup() {
    const fakeEncryptedKey = crypto.randomUUID();
    await saveEncryptedMasterKey(fakeEncryptedKey);
    router.replace("/unlock");
  }

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Secure Your Asset Manager
      </h1>

      <button
        onClick={handleSetup}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Enable Biometric Protection
      </button>
    </main>
  );
}
