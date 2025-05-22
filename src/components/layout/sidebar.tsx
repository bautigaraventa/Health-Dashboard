"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ListChecks } from "lucide-react";
import { ThemeToggle } from "@/components";
import { useRouter } from "next/navigation";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className = "" }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/calls", label: "Calls", icon: ListChecks },
  ];

  return (
    <aside
      className={`flex flex-col w-50 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div
          className="px-6 py-4 font-bold text-xl text-indigo-600 dark:text-indigo-400 cursor-pointer"
          onClick={() => router.push("/")}
        >
          Solum
        </div>
        <ThemeToggle />
      </div>
      <nav className="flex flex-col flex-1 px-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium
              ${
                pathname === href
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }
            `}
          >
            <Icon className="w-5 h-5 mr-3" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
