import { Navbar } from "@/components/navbar";

type AppLayoutProps = Readonly<{ children: React.ReactNode }>;

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="space-y-6">
      <Navbar />
      {children}
    </div>
  );
}
