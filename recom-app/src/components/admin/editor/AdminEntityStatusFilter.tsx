"use client";

import React from 'react';
import { Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminEntityStatusFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const statusOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'active', label: 'Ativos' },
  { value: 'published', label: 'Publicados' },
  { value: 'draft', label: 'Rascunhos' },
];

export function AdminEntityStatusFilter({
  value,
  onChange
}: AdminEntityStatusFilterProps) {
  return (
    <div className="flex items-center gap-1 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
      {statusOptions.map((option) => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              isActive 
                ? "bg-white text-primary shadow-sm ring-1 ring-slate-200" 
                : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
