import type { Metadata } from "next";

import "@/styles/globals.css";

import { fonts } from "@/fonts";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "SmartSpend",
  description:
    "O SmartSpend é um sistema de gestão financeira baseado em IA, que acompanha suas movimentações e oferece insights personalizados, tornando o controle do seu orçamento mais simples e facilitando sua vida."
};

const fontVariables = fonts.map((font) => font.variable).join(" ");

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-br">
      <body className={`${fontVariables} dark font-sans antialiased`}>
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
