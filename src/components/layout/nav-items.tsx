"use client";

import { HomeIcon, ListChecksIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard", icon: HomeIcon },
  { href: "/calls", label: "Calls", icon: ListChecksIcon },
];

interface NavItemsProps {
  onClickHandler?: () => void;
}

export function NavItems({ onClickHandler }: NavItemsProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col px-2 space-y-2">
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          onClick={() => onClickHandler?.()}
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
  );
}
