"use client";

import React from 'react';
import { Search } from 'lucide-react';
import { AdminEntityStatusFilter } from './AdminEntityStatusFilter';

interface AdminEntityListToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  hasStatusFilter?: boolean;
}

export function AdminEntityListToolbar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  hasStatusFilter
}: AdminEntityListToolbarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[2rem] border border-slate-200 shadow-sm">
      <div className="relative w-full md:max-w-md group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Buscar registros..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-transparent rounded-2xl text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-primary/20 transition-all"
        />
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        {hasStatusFilter && (
          <AdminEntityStatusFilter 
            value={statusFilter}
            onChange={onStatusFilterChange}
          />
        )}
      </div>
    </div>
  );
}
