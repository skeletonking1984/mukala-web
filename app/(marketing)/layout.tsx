import { createClient } from "@/lib/supabase-server";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Nav user={user ? { email: user.email } : null} />
      <main className="pt-[72px] relative z-10">{children}</main>
      <Footer />
    </>
  );
}
