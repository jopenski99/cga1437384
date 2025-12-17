import "./globals.css";
import { AppLockProvider } from "@/lib/providers/AppLockProvider";

export const metadata = {
  title: "Asset Manager",
  description: "Personal asset & installment tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* 
          AppLockProvider controls:
          - biometric unlock
          - locked/unlocked state
          - encryption key lifecycle
        */}
        <AppLockProvider>
          {children}
        </AppLockProvider>
      </body>
    </html>
  );
}
