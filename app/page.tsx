import { redirect } from "next/navigation";

/**
 * This page never renders UI.
 * It only redirects based on app state.
 */
export default function HomePage() {
  // Actual logic will happen inside AppLockProvider
  // so here we just send users to /unlock by default
  redirect("/unlock");
}
