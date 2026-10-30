"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";

export function Header() {
  const { usuario, logout } = useAuth();
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 sm:px-16 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <Link href="/" className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 font-serif text-sm text-gold">
          AU
        </span>
        <span className="font-serif text-lg tracking-wide text-foreground">Altos del Uco</span>
      </Link>

      <div className="flex items-center gap-6 text-sm">
        {usuario ? (
          <>
            {usuario.rol === "ADMIN" && (
              <Link href="/admin" className="whitespace-nowrap text-muted-foreground hover:text-gold transition-colors">
                Panel admin
              </Link>
            )}
            <span className="hidden sm:inline text-muted-foreground">
              Hola, {usuario.nombre.split(" ")[0]}
            </span>
            <Button variant="ghost" size="sm" onClick={logout}>
              Cerrar sesión
            </Button>
          </>
        ) : (
          <Link href="/login">
            <Button variant="outline" size="sm">
              Iniciar sesión
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
