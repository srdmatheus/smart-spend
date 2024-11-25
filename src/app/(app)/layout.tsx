import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { Navbar } from "@/components/navbar";

type AppLayoutProps = Readonly<{ children: React.ReactNode }>;

export default async function AppLayout({ children }: AppLayoutProps) {
  const { userId } = await auth();

  if (!userId) redirect("/login");

  return (
    <div className="flex h-screen flex-col space-y-6 overflow-hidden">
      <Navbar />
      <div className="flex h-full flex-col overflow-hidden">{children}</div>
    </div>
  );
}
