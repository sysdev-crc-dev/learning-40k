"use client";
import { cn } from "@/lib/utils";
import { Box, Braces } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

export default function BottomBar() {
  const currentPath = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-14 w-full items-center justify-around bg-background shadow-t dark:bg-gray-900 dark:shadow-t-gray-800">
      <Link
        href="/"
        prefetch={true}
        className={cn(
          "flex flex-col items-center justify-center gap-1  transition-colors hover:bg-royal-purple focus:bg-royal-purple px-4 py-1 rounded-sm",
          {
            "bg-royal-purple": currentPath === "/",
          }
        )}
      >
        <Box className="h-6 w-6" />
        <span className="text-xs">Strats</span>
      </Link>
      <Link
        href="abilities"
        prefetch={true}
        className={cn(
          "flex flex-col items-center justify-center gap-1  transition-colors hover:bg-royal-purple focus:bg-royal-purple px-4 py-1 rounded-sm",
          {
            "bg-royal-purple": currentPath === "/abilities",
          }
        )}
      >
        <Braces className="h-6 w-6" />
        <span className="text-xs">Abilities</span>
      </Link>
    </nav>
  );
}
