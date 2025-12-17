"use client";

export default function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-neutral-900 rounded-2xl p-4">
      <p className="text-xs text-neutral-400">{label}</p>
      <p className="text-xl font-semibold mt-1">
        {value}
      </p>
    </div>
  );
}
