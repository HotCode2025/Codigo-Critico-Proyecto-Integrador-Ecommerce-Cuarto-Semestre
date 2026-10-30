"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Fotos disponibles en frontend/public/productos: las de los 8 vinos del
// catálogo y 5 botellas de stock con la etiqueta en blanco, para productos
// nuevos que todavía no tienen una foto propia.
const FOTOS = [
  "/productos/confin-andino.jpg",
  "/productos/trece-hileras.jpg",
  "/productos/ultima-piedra.jpg",
  "/productos/alma-de-uco.jpg",
  "/productos/sendero-del-condor.jpg",
  "/productos/corazon-de-piedra.jpg",
  "/productos/puerta-del-viento.jpg",
  "/productos/silencio-de-altura.jpg",
  "/productos/botella-tinta.jpg",
  "/productos/botella-tinta-2.jpg",
  "/productos/botella-tinta-3.jpg",
  "/productos/botella-blanca-1.jpg",
  "/productos/botella-blanca-2.jpg",
];

const productoVacio = {
  nombre: "",
  bodega: "",
  varietal: "",
  anada: "",
  region: "",
  precio: "",
  stock: "",
  descripcion: "",
  notasCata: "",
  maridaje: "",
  imagenUrl: "",
};

// Pasa los null de la base a "" para que los inputs queden controlados.
function aFormulario(producto) {
  const datos = { ...productoVacio };
  Object.keys(productoVacio).forEach((campo) => {
    if (producto[campo] !== null && producto[campo] !== undefined) {
      datos[campo] = String(producto[campo]);
    }
  });
  return datos;
}

function Campo({ etiqueta, children, className }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{etiqueta}</label>
      {children}
    </div>
  );
}

function AreaTexto(props) {
  return (
    <textarea
      rows={3}
      className="w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
      {...props}
    />
  );
}

export function ProductoForm({ productoInicial, textoBoton, onGuardar }) {
  const [datos, setDatos] = useState(() =>
    productoInicial ? aFormulario(productoInicial) : productoVacio
  );
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  // Si el producto ya tenía una foto que no está en la lista, se agrega
  // primera para que se vea cuál está elegida.
  const fotos =
    datos.imagenUrl && !FOTOS.includes(datos.imagenUrl) ? [datos.imagenUrl, ...FOTOS] : FOTOS;

  function actualizar(campo, valor) {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setEnviando(true);
    try {
      await onGuardar({
        ...datos,
        anada: Number(datos.anada),
        precio: Number(datos.precio),
        stock: Number(datos.stock),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar el producto");
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Campo etiqueta="Nombre" className="sm:col-span-2">
          <Input value={datos.nombre} onChange={(e) => actualizar("nombre", e.target.value)} required />
        </Campo>
        <Campo etiqueta="Bodega">
          <Input value={datos.bodega} onChange={(e) => actualizar("bodega", e.target.value)} required />
        </Campo>
        <Campo etiqueta="Varietal">
          <Input
            value={datos.varietal}
            onChange={(e) => actualizar("varietal", e.target.value)}
            placeholder="Malbec, Cabernet Franc..."
            required
          />
        </Campo>
        <Campo etiqueta="Añada">
          <Input
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            value={datos.anada}
            onChange={(e) => actualizar("anada", e.target.value)}
            required
          />
        </Campo>
        <Campo etiqueta="Región">
          <Input
            value={datos.region}
            onChange={(e) => actualizar("region", e.target.value)}
            placeholder="Gualtallary, Tupungato"
            required
          />
        </Campo>
        <Campo etiqueta="Precio (ARS)">
          <Input
            type="number"
            min="1"
            step="0.01"
            value={datos.precio}
            onChange={(e) => actualizar("precio", e.target.value)}
            required
          />
        </Campo>
        <Campo etiqueta="Stock (unidades)">
          <Input
            type="number"
            min="0"
            step="1"
            value={datos.stock}
            onChange={(e) => actualizar("stock", e.target.value)}
            required
          />
        </Campo>
        <Campo etiqueta="Descripción" className="sm:col-span-2">
          <AreaTexto value={datos.descripcion} onChange={(e) => actualizar("descripcion", e.target.value)} />
        </Campo>
        <Campo etiqueta="Notas de cata" className="sm:col-span-2">
          <AreaTexto value={datos.notasCata} onChange={(e) => actualizar("notasCata", e.target.value)} />
        </Campo>
        <Campo etiqueta="Maridaje" className="sm:col-span-2">
          <AreaTexto value={datos.maridaje} onChange={(e) => actualizar("maridaje", e.target.value)} />
        </Campo>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Foto</p>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
          <button
            type="button"
            onClick={() => actualizar("imagenUrl", "")}
            className={cn(
              "relative aspect-[1/2] rounded-md border text-xs text-muted-foreground transition-colors",
              datos.imagenUrl === "" ? "border-gold ring-2 ring-gold/50" : "border-border hover:border-gold/60"
            )}
          >
            Sin foto
          </button>
          {fotos.map((foto) => (
            <button
              key={foto}
              type="button"
              onClick={() => actualizar("imagenUrl", foto)}
              className={cn(
                "relative aspect-[1/2] overflow-hidden rounded-md border transition-colors",
                datos.imagenUrl === foto ? "border-gold ring-2 ring-gold/50" : "border-border hover:border-gold/60"
              )}
              aria-label={`Usar la foto ${foto}`}
            >
              <Image src={foto} alt="" fill className="object-cover" sizes="120px" />
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={enviando}>
          {enviando ? "Guardando..." : textoBoton}
        </Button>
        <Link href="/admin">
          <Button type="button" variant="ghost">
            Cancelar
          </Button>
        </Link>
      </div>
    </form>
  );
}
