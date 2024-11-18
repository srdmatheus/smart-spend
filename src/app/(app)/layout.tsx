import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { Navbar } from "@/components/navbar";

type AppLayoutProps = Readonly<{ children: React.ReactNode }>;

export default async function AppLayout({ children }: AppLayoutProps) {
  const { userId } = await auth();

  if (!userId) redirect("/login");

  return (
    <div className="space-y-6">
      <Navbar />
      {children}
    </div>
  );
}
