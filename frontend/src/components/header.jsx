"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 sm:px-16 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <Link href="/" className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 font-serif text-sm text-gold">
          AU
        </span>
        <span className="font-serif text-lg tracking-wide text-foreground">Altos del Uco</span>
      </Link>
    </header>
  );
}
