"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getEncryptedMasterKey } from "@/lib/storage/db";

const APP_LOCK_DISABLED = false;
import { seedAccounts } from "@/lib/seeders/accounts";

type AppLockContextType = {
    isUnlocked: boolean;
    unlock: () => Promise<void>;
    lock: () => void;
};

const AppLockContext = createContext<AppLockContextType | null>(null);

export function useAppLock() {
    const ctx = useContext(AppLockContext);
    if (!ctx) throw new Error("useAppLock must be used inside AppLockProvider");
    return ctx;
}

export function AppLockProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isUnlocked, setIsUnlocked] = useState(APP_LOCK_DISABLED);
    useEffect(() => {
        seedAccounts();
        if (APP_LOCK_DISABLED) {
            // Skip all lock logic in dev
            return;
        }

        async function bootstrap() {
            const keyExists = await getEncryptedMasterKey();

            if (!keyExists) {
                router.replace("/setup");
            } else {
                router.replace("/unlock");
            }
        }

        bootstrap();
    }, [router]);

    async function unlock() {
        if (APP_LOCK_DISABLED) return;

        setIsUnlocked(true);
        router.replace("/locked/assets");
    }

    function lock() {
        if (APP_LOCK_DISABLED) return;

        setIsUnlocked(false);
        router.replace("/unlock");
    }

    return (
        <AppLockContext.Provider value={{ isUnlocked, unlock, lock }}>
            {children}
        </AppLockContext.Provider>
    );
}

