import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | RECOM® Metal Duro",
    default: "RECOM® Metal Duro - Distribuidor técnico desde 1990",
  },
  description: "Distribuidor B2B de ferramentas de corte e soluções de usinagem com presença regional e histórico técnico comprovado.",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
