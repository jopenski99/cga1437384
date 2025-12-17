"use client";

import { Home, Wallet, CreditCard } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "Home", icon: Home, href: "/locked/dashboard" },
  { label: "Assets", icon: Wallet, href: "/locked/assets" },
  { label: "Expenses", icon: CreditCard, href: "/locked/expense" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 h-16 flex justify-around items-center">
      {navItems.map(({ label, icon: Icon, href }) => {
        const active = pathname.startsWith(href);

        return (
          <button
            key={label}
            onClick={() => router.push(href)}
            className={`flex flex-col items-center text-xs ${
              active ? "text-teal-400" : "text-neutral-400"
            }`}
          >
            <Icon size={20} />
            {label}
          </button>
        );
      })}
    </nav>
  );
}
