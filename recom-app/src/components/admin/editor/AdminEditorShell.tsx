"use client";

import React from "react";
import { AdminEditorHeader } from "./AdminEditorHeader";
import { AdminEditorSidebar, AdminEditorTab } from "./AdminEditorSidebar";
import { AdminEditorStatus } from "./AdminStatusBadge";

export interface AdminEditorShellProps {
  title: string;
  entityType: string;
  status: AdminEditorStatus;
  tabs: AdminEditorTab[];
  activeTabId: string;
  onTabChange: (id: string) => void;
  onSave: () => void;
  onPreview?: () => void;
  onPublish?: () => void;
  isDirty?: boolean;
  isSaving?: boolean;
  lastSaved?: Date;
  backHref?: string;
  children: React.ReactNode;
  inspector?: React.ReactNode;
}

export function AdminEditorShell({
  title,
  entityType,
  status,
  tabs,
  activeTabId,
  onTabChange,
  onSave,
  onPreview,
  onPublish,
  isDirty,
  isSaving,
  lastSaved,
  backHref,
  children,
  inspector,
}: AdminEditorShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50">
      <AdminEditorHeader
        title={title}
        entityType={entityType}
        status={status}
        onSave={onSave}
        onPreview={onPreview}
        onPublish={onPublish}
        isDirty={isDirty}
        isSaving={isSaving}
        lastSaved={lastSaved}
        backHref={backHref}
      />

      <div className="mx-auto flex w-full max-w-[1600px] flex-1 gap-12 p-8">
        <AdminEditorSidebar
          tabs={tabs}
          activeTabId={activeTabId}
          onTabChange={onTabChange}
        />

        <main className="min-w-0 flex-1">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {children}
          </div>
        </main>

        {inspector && (
          <div className="hidden min-[1400px]:block">
            {inspector}
          </div>
        )}
      </div>
    </div>
  );
}
