"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";

// Envuelve las páginas de /admin. Es solo para la interfaz: la protección
// real está en el backend, que rechaza con 403 a quien no sea ADMIN.
export function SoloAdmin({ children }) {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return <div className="min-h-screen px-8 py-12 sm:px-16 text-muted-foreground">Cargando...</div>;
  }

  if (!usuario || usuario.rol !== "ADMIN") {
    return (
      <div className="min-h-[60vh] px-8 py-12 sm:px-16 flex flex-col items-center justify-center text-center gap-4">
        <h1 className="font-serif text-3xl text-foreground">Acceso restringido</h1>
        <p className="text-muted-foreground max-w-md">
          Esta sección es solo para administradores de la tienda.
        </p>
        <Link href={usuario ? "/" : "/login"}>
          <Button variant="outline">{usuario ? "Volver al catálogo" : "Iniciar sesión"}</Button>
        </Link>
      </div>
    );
  }

  return children;
}
