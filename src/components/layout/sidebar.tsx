import { Logo } from "./logo";
import { NavItems } from "./nav-items";
import { ThemeToggle } from "./theme-toggle";

export function Sidebar() {
  return (
    <aside
      className={`hidden md:flex flex flex-col w-50 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800`}
    >
      <div className="flex items-center justify-between pl-4">
        <Logo />
        <ThemeToggle />
      </div>
      <NavItems />
    </aside>
  );
}
