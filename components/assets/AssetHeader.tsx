"use client";

import { Asset } from "@/lib/models/assets";

export default function   AssetHeader({ asset }: { asset: Asset }) {
  return (
    <div className="space-y-2 ">
      <p className="text-sm text-neutral-400">{asset.type}</p>
      <h1 className="text-2xl font-bold">{asset.name}</h1>
      <p className="text-lg text-neutral-300">
        ₱{asset.value.toLocaleString()}
      </p>
    </div>
  );
}
