import React from "react";

import { AdminShell } from "@/components/admin/AdminShell";
import { requireAuth } from "@/lib/auth/utils";

export const metadata = {
  title: "Painel CMS - RECOM",
  description: "Sistema administrativo RECOM",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAuth();

  return <AdminShell>{children}</AdminShell>;
}
