"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { obtenerPedido } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ESTADOS_PEDIDO } from "@/lib/estados-pedido";

function formatearPrecio(precio) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(precio);
}

function formatearFecha(fecha) {
  return new Intl.DateTimeFormat("es-AR", { dateStyle: "long", timeStyle: "short" }).format(new Date(fecha));
}

// Al imprimir o guardar como PDF se ocultan el encabezado y el pie del sitio.
const ESTILOS_IMPRESION = `
  @media print {
    header, footer, .no-imprimir { display: none !important; }
    body { background: white !important; }
    .comprobante { color: black !important; border: none !important; padding: 0 !important; }
    .comprobante * { color: black !important; border-color: #999 !important; }
  }
`;

export default function ComprobantePage() {
  const { id } = useParams();
  const { usuario, token, cargando: cargandoAuth } = useAuth();
  const router = useRouter();
  const [pedido, setPedido] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cargandoAuth) return;
    if (!usuario) {
      router.push("/login");
      return;
    }
    if (!token) return;
    obtenerPedido(token, id)
      .then(setPedido)
      .catch((err) => setError(err instanceof Error ? err.message : "No se pudo cargar el pedido"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cargandoAuth, usuario, id]);

  if (cargandoAuth || (!pedido && !error)) {
    return <p className="px-8 py-12 sm:px-16 text-muted-foreground">Cargando comprobante...</p>;
  }

  if (error || !pedido) {
    return (
      <div className="px-8 py-12 sm:px-16">
        <p className="text-destructive mb-4">{error}</p>
        <Link href="/pedidos" className="text-gold hover:underline">
          Volver a mis pedidos
        </Link>
      </div>
    );
  }

  // El comprobante es la constancia de un pago: sólo existe para pedidos pagados.
  if (pedido.estado !== "PAGADO" && pedido.estado !== "ENVIADO") {
    return (
      <div className="px-8 py-12 sm:px-16 max-w-xl">
        <p className="text-muted-foreground mb-4">
          Este pedido figura como «{ESTADOS_PEDIDO[pedido.estado].etiqueta}». El comprobante está disponible
          cuando el pago está aprobado.
        </p>
        <Link href={`/pedidos/${pedido.id}`} className="text-gold hover:underline">
          Volver al pedido
        </Link>
      </div>
    );
  }

  const subtotal = Number(pedido.total) - Number(pedido.costoEnvio);

  return (
    <div className="min-h-screen px-8 py-12 sm:px-16">
      <style>{ESTILOS_IMPRESION}</style>

      <div className="no-imprimir flex flex-wrap items-center justify-between gap-4 max-w-2xl mb-8">
        <Link
          href={`/pedidos/${pedido.id}`}
          className="text-sm text-muted-foreground hover:text-gold transition-colors"
        >
          ← Volver al pedido
        </Link>
        <Button onClick={() => window.print()}>Imprimir o guardar como PDF</Button>
      </div>

      <article className="comprobante max-w-2xl rounded-lg border border-border/60 p-8 space-y-6">
        <header className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
          <div>
            <p className="font-serif text-2xl text-foreground">Altos del Uco</p>
            <p className="text-sm text-muted-foreground">Vinos de bodegas boutique del Valle de Uco, Mendoza</p>
          </div>
          <div className="text-right text-sm">
            <p className="font-serif text-lg text-foreground">Comprobante de compra</p>
            <p className="text-muted-foreground">Pedido #{pedido.id}</p>
            <p className="text-muted-foreground">{formatearFecha(pedido.fecha)}</p>
          </div>
        </header>

        <section className="text-sm">
          <p className="text-xs uppercase tracking-wider text-gold mb-1">Cliente</p>
          <p className="text-foreground">{usuario.nombre}</p>
          <p className="text-muted-foreground">{usuario.email}</p>
        </section>

        <section>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-border/60">
                <th className="py-2 font-normal">Producto</th>
                <th className="py-2 font-normal text-center">Cant.</th>
                <th className="py-2 font-normal text-right">Precio</th>
                <th className="py-2 font-normal text-right">Importe</th>
              </tr>
            </thead>
            <tbody>
              {pedido.items.map((item) => (
                <tr key={item.id} className="border-b border-border/40">
                  <td className="py-2 text-foreground">
                    {item.producto.nombre}
                    <span className="block text-xs text-muted-foreground">{item.producto.bodega}</span>
                  </td>
                  <td className="py-2 text-center text-muted-foreground">{item.cantidad}</td>
                  <td className="py-2 text-right text-muted-foreground">
                    {formatearPrecio(Number(item.precioUnitario))}
                  </td>
                  <td className="py-2 text-right text-foreground">
                    {formatearPrecio(item.cantidad * Number(item.precioUnitario))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 ml-auto w-full max-w-xs space-y-1 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatearPrecio(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Envío</span>
              <span>{Number(pedido.costoEnvio) > 0 ? formatearPrecio(Number(pedido.costoEnvio)) : "Gratis"}</span>
            </div>
            <div className="flex justify-between text-lg text-foreground pt-1 border-t border-border/60">
              <span>Total</span>
              <span className="font-serif">{formatearPrecio(Number(pedido.total))}</span>
            </div>
          </div>
        </section>

        <section className="text-sm">
          <p className="text-xs uppercase tracking-wider text-gold mb-1">Dirección de envío</p>
          <p className="text-muted-foreground">
            {pedido.direccionCalle}, {pedido.direccionCiudad}, {pedido.direccionProvincia} (CP{" "}
            {pedido.direccionCodigoPostal})
          </p>
        </section>

        <section className="text-sm">
          <p className="text-xs uppercase tracking-wider text-gold mb-1">Estado</p>
          <p className="text-muted-foreground">
            {ESTADOS_PEDIDO[pedido.estado].etiqueta}
            {pedido.estado === "ENVIADO" && ` · ${pedido.transportista} · ${pedido.numeroSeguimiento}`}
          </p>
        </section>

        <p className="text-xs text-muted-foreground border-t border-border/60 pt-4">
          Este comprobante <strong>no es una factura fiscal</strong>. Es la constancia de tu compra en Altos del
          Uco, un proyecto académico de la materia Programación IV. Pago procesado por Mercado Pago.
        </p>
      </article>
    </div>
  );
}
