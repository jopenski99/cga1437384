"use client";

import { Asset } from "@/lib/models/assets";
import AssetStatusBadge from "./AssetStatusBadge";
import { ChevronRight } from "lucide-react";

interface Props {
  asset: Asset;
  onClick?: () => void;
}

export default function AssetCard({ asset, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="bg-neutral-900 rounded-2xl p-3 flex justify-between items-center cursor-pointer hover:bg-neutral-800 transition"
    >
      <div className="space-y-1">
        <p className="text-sm text-neutral-400">{asset.type}</p>
        <h3 className="text-lg font-semibold">{asset.name}</h3>

        <p className="text-sm text-neutral-300">
          ₱{asset.value.toLocaleString()}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <AssetStatusBadge asset={asset} />
        <ChevronRight size={20} className="text-neutral-500" />
      </div>
    </div>
  );
}
