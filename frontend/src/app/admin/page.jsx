"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { listarProductosAdmin, eliminarProducto } from "@/lib/admin-api";
import { SoloAdmin } from "@/components/admin/solo-admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function formatearPrecio(precio) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(Number(precio));
}

function TablaProductos() {
  const { token } = useAuth();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    listarProductosAdmin(token)
      .then(setProductos)
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, [token]);

  async function borrar(producto) {
    if (!window.confirm(`¿Borrar "${producto.nombre}"? Esta acción no se puede deshacer.`)) return;

    setError("");
    try {
      await eliminarProducto(token, producto.id);
      setProductos((prev) => prev.filter((p) => p.id !== producto.id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen px-8 py-12 sm:px-16">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <p className="font-script text-3xl text-gold">Panel de administración</p>
          <h1 className="font-serif text-4xl text-foreground">Productos</h1>
        </div>
        <Link href="/admin/productos/nuevo">
          <Button>Nuevo producto</Button>
        </Link>
      </div>

      {error && <p className="text-sm text-destructive mb-6">{error}</p>}

      {cargando ? (
        <p className="text-muted-foreground">Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p className="text-muted-foreground">Todavía no hay productos cargados.</p>
      ) : (
        <ul className="divide-y divide-border/60 border-y border-border/60">
          {productos.map((producto) => (
            <li key={producto.id} className="flex flex-wrap items-center gap-4 py-4">
              <div className="relative h-20 w-10 shrink-0 overflow-hidden rounded border border-border/60">
                <Image
                  src={producto.imagenUrl || "/productos/placeholder.svg"}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>

              <div className="flex-1 min-w-48">
                <p className="font-serif text-lg text-foreground leading-snug">{producto.nombre}</p>
                <p className="text-sm text-muted-foreground">
                  {producto.bodega} · {producto.varietal} {producto.anada}
                </p>
              </div>

              <div className="w-28 text-gold font-serif">{formatearPrecio(producto.precio)}</div>

              <div className="w-28">
                {producto.stock > 0 ? (
                  <span className="text-sm text-foreground">{producto.stock} u.</span>
                ) : (
                  <Badge variant="destructive">Sin stock</Badge>
                )}
              </div>

              <div className="flex gap-2">
                <Link href={`/admin/productos/${producto.id}`}>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => borrar(producto)}>
                  Borrar
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AdminPage() {
  return (
    <SoloAdmin>
      <TablaProductos />
    </SoloAdmin>
  );
}
