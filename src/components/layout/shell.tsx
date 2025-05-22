"use client";

import React, { useState } from "react";
import { Sidebar } from "./sidebar";
import { MobileNav } from "./mobile-nav";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex md:flex-row flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar className="hidden md:flex" />
      <MobileNav
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
        className="md:hidden"
      />
      <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
    </div>
  );
}
