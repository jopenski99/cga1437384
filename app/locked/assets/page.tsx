"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Asset } from "@/lib/models/assets";
import { getAssets } from "@/lib/storage/assets";
import { getPaymentsByAsset } from "@/lib/storage/payments";
import { allocatePayments } from "@/lib/services/paymentAllocator";
/* import { getPaymentStatus } from "@/lib/services/paymentStatus"; */

import AppShell from "@/components/layout/AppShell";
import AssetCard from "@/components/assets/AssetCard";
import CustomSelect from "@/components/ui/CustomSelect";

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [summaries, setSummaries] = useState<Record<string, any>>({});
  const router = useRouter();


  useEffect(() => {
    async function load() {
      const storedAssets = await getAssets();
      setAssets(storedAssets);

      const map: Record<string, any> = {};
      for (const asset of storedAssets) {
        if (!asset.obligation) continue;

        const payments = await getPaymentsByAsset(asset.id);
        map[asset.id] = allocatePayments(
          asset.obligation,
          payments
        );
      }

      setSummaries(map);
    }

    load();
  }, []);

  return (
    <AppShell title="Assets">
      <div className="text-neutral-400">
        <div className=" space-y-4">
          {assets.length === 0 && (
            <p className="text-neutral-400 text-center mt-8">
              No assets yet.
            </p>
          )}
          <div className="flex items-center justify-end ">
            <button
              onClick={() =>
                router.push(`/locked/assets/new`)
              }
              className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-teal-500 text-black"
            >
              <Plus size={16} />
              Add asset
            </button>
          </div>
          {assets.map(asset => (
            <AssetCard
              key={asset.id}
              asset={asset}
              onClick={() =>
                router.push(`/locked/assets/${asset.id}`)
              }
            />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
