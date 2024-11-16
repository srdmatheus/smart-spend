import Image from "next/image";
import { redirect } from "next/navigation";

import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import { Button } from "@/components/ui/button";

export default async function LoginPage() {
  const { userId } = await auth();

  if (userId) redirect("/");

  return (
    <div className="grid h-dvh grid-cols-2 bg-[#101010] text-[#929292]">
      <main className="mx-auto flex h-full max-w-[560px] flex-col justify-center">
        <h1 className="mb-8 font-semibold tracking-tight">
          financeiro inteligente
        </h1>
        <h1 className="mb-3 text-4xl font-semibold">Bem-vindo!</h1>
        <p className="mb-8">
          O Financeiro Inteligente é um sistema de gestão financeira baseado em
          IA, que acompanha suas movimentações e oferece insights
          personalizados, tornando o controle do seu orçamento mais simples e
          facilitando sua vida.
        </p>
        <SignInButton>
          <Button variant="outline">Entre ou registre-se</Button>
        </SignInButton>
      </main>
      <div className="relative h-full w-full">
        <Image src="/login-bg.jpg" fill alt="" className="object-cover" />
      </div>
    </div>
  );
}
