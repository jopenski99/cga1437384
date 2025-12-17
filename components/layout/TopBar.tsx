"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Settings } from "lucide-react";
import { ReactNode } from "react";



interface Props {
  title?: string;
  showBack?: boolean;
  rightAction?: ReactNode;
  onOpenSettings: () => void;
}


export default function TopBar({
  title,
  showBack,
  rightAction,
  onOpenSettings
}: Props) {
  const router = useRouter();

  return (
    <header className="bg-black w-full fixed h-14 px-4 flex items-center justify-between border-b border-neutral-800" style={{zIndex: 999}}>
      <div className="flex items-center gap-3 w-full bg-black">


        <button
          onClick={() => router.back()}
          className="p-1 rounded hover:bg-neutral-800"
          style={{ visibility: showBack ? "visible" : "hidden" }}
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex items-center gap-2 justify-center w-full">
          <img src="/assets/favicon-32x32.png" alt="logo" className="h-9 w-9 " />
          {title && (
            <div className="flex flex-col items-center">
              <h1 className="text-lg font-semibold justify-start">Axcelion</h1>
              {title && (
                <div className="text-neutral-400 text-center text-sm">
                  <p>{title}</p>
                </div>
              )}
            </div>
          )}
        </div>
        <button onClick={onOpenSettings} className="ml-auto p-1 rounded hover:bg-neutral-800">
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {rightAction && <div>{rightAction}</div>}
    </header>
  );
}
