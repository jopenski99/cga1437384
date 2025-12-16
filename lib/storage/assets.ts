import { Asset } from "@/lib/models/assets";
import { getEncryptedMasterKey } from "./db"; // ensures browser-only init
import { getDB } from '@/lib/storage/db'

/**
 * TEMP encryption placeholders
 */
function encrypt(data: any) {
  return {
    id: data.id,                 // ✅ REQUIRED
    payload: JSON.stringify(data),
    createdAt: new Date().toISOString(),
  };
}

function decrypt(data: string) {
  return JSON.parse(data);
}



/**
 * Save asset
 */
export async function saveAsset(asset: Asset) {
  const db = await getDB();
  const encrypted = encrypt({
    ...asset,
    id: asset.id
  });
  await db.put("encryptedData", encrypted);
}

/**
 * Get all assets
 */
export async function getAssets(): Promise<Asset[]> {
  const db = await getDB();
  const keys = await db.getAllKeys("encryptedData");
  const results: Asset[] = [];

  for (const key of keys) {
    const encrypted = await db.get("encryptedData", key);
    if (encrypted) {
      results.push(decrypt(encrypted.payload));
    }
  }

  return results;
}



export async function getAssetById(id: string): Promise<Asset | null> {
  const db = await getDB();
  const encrypted = await db.get("encryptedData", id);

  if (!encrypted) return null;

  return decrypt(encrypted.payload) as Asset;
}