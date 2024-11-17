import { redirect } from "next/navigation";

import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function HomePage() {
  const { userId } = await auth();

  if (!userId) redirect("/login");

  return (
    <main className="px-6">
      <h1>home page</h1>
      <UserButton showName />
    </main>
  );
}
