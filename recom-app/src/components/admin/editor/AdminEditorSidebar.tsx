"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type AdminEditorTab = {
  id: string;
  label: string;
  icon?: LucideIcon;
  badge?: string | number;
  disabled?: boolean;
};

interface AdminEditorSidebarProps {
  tabs: AdminEditorTab[];
  activeTabId: string;
  onTabChange: (id: string) => void;
  className?: string;
}

export function AdminEditorSidebar({
  tabs,
  activeTabId,
  onTabChange,
  className,
}: AdminEditorSidebarProps) {
  return (
    <aside className={cn("w-64 shrink-0 flex flex-col", className)}>
      <nav className="space-y-1 sticky top-24">
        <p className="px-3 pb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Navegação
        </p>
        
        {tabs.map((tab) => {
          const isActive = activeTabId === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && onTabChange(tab.id)}
              disabled={tab.disabled}
              className={cn(
                "group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition-all",
                isActive
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900",
                tab.disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <div className="flex items-center gap-3">
                {Icon && (
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      isActive ? "text-white" : "text-slate-400 group-hover:text-slate-900"
                    )}
                  />
                )}
                <span className="uppercase tracking-wider">{tab.label}</span>
              </div>
              
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    "flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-black",
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
