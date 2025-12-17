"use client";

import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (route: string) => void;
}

export default function SettingsDrawer({ open, onClose, onSelect }: Props) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-neutral-900 z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-neutral-800">
          <h2 className="font-semibold">Settings</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">
          <button
            className="w-full text-left p-2 rounded hover:bg-gray-100"
            onClick={() => onSelect("/locked/settings/accounts")}
          >
            Accounts
          </button>
        </nav>
      </aside>
    </>
  );
}
