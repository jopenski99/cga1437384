import { openDB, IDBPDatabase } from "idb";

let db: IDBPDatabase | null = null;

export async function getDB() {
  if (typeof window === "undefined") {
    throw new Error("IndexedDB is only available in the browser");
  }

  if (!db) {
    db = await openDB("asset-manager-db", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("assets")) {
          db.createObjectStore("assets", { keyPath: "id" });
        }

        if (!db.objectStoreNames.contains("payments")) {
          db.createObjectStore("payments", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("encryptedData")) {
          db.createObjectStore("encryptedData", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("accounts")) {
          db.createObjectStore("accounts", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("expenses")) {
          const store = db.createObjectStore("expenses", {
            keyPath: "id",
          });

          store.createIndex("date", "date");
          store.createIndex("category", "category");
        }
      },
    });
  }

  return db;
}

/**
 * Save encrypted master key
 */
export async function saveEncryptedMasterKey(value: string) {
  const db = await getDB();
  await db.put("keys", value, "master");
}

/**
 * Load encrypted master key
 */
export async function getEncryptedMasterKey() {
  const db = await getDB();
  return db.get("keys", "master");
}
