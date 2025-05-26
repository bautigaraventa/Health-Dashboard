"use client";

import { useRouter } from "next/navigation";

interface MobileNavProps {
  onClickHandler?: () => void;
}

export function Logo({ onClickHandler }: MobileNavProps) {
  const router = useRouter();

  return (
    <h2
      className="text-xl font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer"
      onClick={() => {
        router.push("/");
        onClickHandler?.();
      }}
    >
      Solum
    </h2>
  );
}
