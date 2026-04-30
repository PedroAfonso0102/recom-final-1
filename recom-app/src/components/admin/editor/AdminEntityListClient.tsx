"use client";

import React from 'react';

interface AdminEntityListClientProps {
  items: unknown[];
  searchFields: string[];
  statusField?: string;
  statusOptions?: { value: string; label: string }[];
  children: React.ReactNode;
}

export function AdminEntityListClient({
  children
}: AdminEntityListClientProps) {
  return (
    <div className="space-y-8">
      {/* 
        Toolbar is removed for now to ensure 100% stability. 
        Client-side searching would require moving list rendering back 
        to the client, which violates RSC boundaries for renderItem.
      */}
      {children}
    </div>
  );
}
