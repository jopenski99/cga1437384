"use client";

import { ReactNode, useState  } from "react";
import BottomNav from "./BottomNav";
import { useRouter } from "next/navigation";
import TopBar from "@/components/layout/TopBar";
import SettingsDrawer from "@/components/layout/SettingsDrawer";
interface Props {
  title?: string;
  showBack?: boolean;
  rightAction?: ReactNode;
  children: ReactNode;
}

export default function AppShell({
  title,
  showBack,
  rightAction,
  children,
}: Props) {

  const [open, setOpen] = useState(false);
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
      <TopBar title={title} showBack={showBack} rightAction={rightAction} onOpenSettings={() => setOpen(true)} />
      <SettingsDrawer
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(route) => {
          setOpen(false);
          router.push(route);
        }}
      />
      <main className="flex-1 overflow-y-auto px-4 pb-24 pt-18">
        
        {children}
      </main>

      <BottomNav />
    </div>
  );
}
