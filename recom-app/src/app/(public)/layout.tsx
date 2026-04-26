import type { Metadata } from "next";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { ScrollProgress } from "@/components/public/ScrollProgress";
import { WhatsAppFAB } from "@/components/public/WhatsAppFAB";

export const metadata: Metadata = {
  title: {
    template: "%s | RECOM Metal Duro",
    default: "RECOM Metal Duro - Distribuidor técnico desde 1990",
  },
  description:
    "Distribuidor B2B de ferramentas de corte e soluções de usinagem com presença regional, curadoria de fornecedores e atendimento humano.",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased text-foreground selection:bg-primary selection:text-primary-foreground">
      <ScrollProgress />
      <Header />
      <main data-hook="public.global.main" className="flex-1 animate-in fade-in duration-700 fill-mode-both">
        {children}
      </main>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
