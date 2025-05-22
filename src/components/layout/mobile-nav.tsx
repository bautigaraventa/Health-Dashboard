"use client";

import * as React from "react";
import Link from "next/link";
import { Dialog } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export function MobileNav({
  open,
  onOpenChange,
  className = "",
}: MobileNavProps) {
  const router = useRouter();

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/calls", label: "Calls" },
  ];

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <Button
        aria-label="Open menu"
        variant={"outline"}
        className={"p-2 m-2 rounded-md self-start"}
        onClick={() => onOpenChange(true)}
      >
        <Menu className="w-6 h-6" />
      </Button>

      <Dialog
        open={open}
        onClose={() => onOpenChange(false)}
        className="fixed inset-0 z-50"
      >
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />

        <div className="fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-800 p-4 shadow-lg flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2
              className="text-lg font-bold text-indigo-600 dark:text-indigo-400"
              onClick={() => {
                router.push("/");
                onOpenChange(false);
              }}
            >
              Solum
            </h2>
            <button
              aria-label="Close menu"
              onClick={() => onOpenChange(false)}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col space-y-2">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => onOpenChange(false)}
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md font-medium"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </Dialog>

      <ThemeToggle />
    </div>
  );
}
