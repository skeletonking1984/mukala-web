import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { AppNav } from "@/components/layout/app-nav";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-8 py-5 border-b border-white/10 backdrop-blur-xl bg-void/70 sticky top-0 z-40">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">
          <Logo />
          <AppNav email={user.email || ""} />
        </div>
      </header>
      <main className="flex-1 relative z-10">{children}</main>
    </div>
  );
}
