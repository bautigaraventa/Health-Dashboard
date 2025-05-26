"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Menu, X } from "lucide-react";

import { Logo } from "./logo";
import { NavItems } from "./nav-items";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "../ui";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`md:hidden flex items-center justify-between`}>
      <Button
        aria-label="Open menu"
        variant={"outline"}
        className={"p-2 m-2 rounded-md self-start"}
        onClick={() => setOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="fixed inset-0 z-50"
      >
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />

        <div className="fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-800 p-4 shadow-lg flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <Logo onClickHandler={() => setOpen(false)} />
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <NavItems onClickHandler={() => setOpen(false)} />
        </div>
      </Dialog>

      <ThemeToggle />
    </div>
  );
}
