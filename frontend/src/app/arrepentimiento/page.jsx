"use client";

import { useState } from "react";
import Link from "next/link";
import { solicitarArrepentimiento } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EMAIL_ATENCION } from "@/lib/tienda";

export default function ArrepentimientoPage() {
  const [pedidoId, setPedidoId] = useState("");
  const [email, setEmail] = useState("");
  const [motivo, setMotivo] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setEnviando(true);
    try {
      const respuesta = await solicitarArrepentimiento({ pedidoId, email, motivo });
      setMensaje(respuesta.mensaje);
    } catch (err) {
      // Un TypeError es una falla de red (el servidor no respondió): se muestra
      // un mensaje entendible en vez de «Failed to fetch».
      setError(
        err instanceof TypeError
          ? `No pudimos conectar con el servidor. Probá de nuevo en un momento o escribinos a ${EMAIL_ATENCION}.`
          : err instanceof Error
            ? err.message
            : "No se pudo enviar la solicitud"
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="min-h-screen px-8 py-12 sm:px-16">
      <div className="max-w-xl">
        <Link href="/" className="text-sm text-muted-foreground hover:text-gold transition-colors">
          ← Volver al catálogo
        </Link>

        <h1 className="font-serif text-4xl text-foreground mt-8">Arrepentimiento de compra</h1>
        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
          Si te arrepentís de tu compra, podés pedir la devolución dentro de los{" "}
          <strong className="text-foreground">10 días corridos</strong> de recibido el producto, sin necesidad de
          explicar el motivo. Completá el formulario con el número de tu pedido y el email con el que compraste:
          nos vamos a comunicar con vos para coordinar la devolución y el reembolso.
        </p>

        {mensaje ? (
          <div className="mt-8 rounded-lg border border-gold/40 p-5">
            <p className="text-foreground">{mensaje}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Te enviamos una copia por email. Si tenés dudas, escribinos a{" "}
              <a href={`mailto:${EMAIL_ATENCION}`} className="text-gold hover:underline">
                {EMAIL_ATENCION}
              </a>
              .
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="pedidoId" className="text-sm text-foreground">
                Número de pedido
              </label>
              <Input
                id="pedidoId"
                type="number"
                min="1"
                inputMode="numeric"
                placeholder="Por ejemplo, 6"
                value={pedidoId}
                onChange={(e) => setPedidoId(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">Lo encontrás en «Mis pedidos».</p>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm text-foreground">
                Email de la compra
              </label>
              <Input
                id="email"
                type="email"
                placeholder="El email con el que te registraste"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="motivo" className="text-sm text-foreground">
                Motivo <span className="text-muted-foreground">(opcional)</span>
              </label>
              <textarea
                id="motivo"
                rows={4}
                maxLength={1000}
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full" disabled={enviando}>
              {enviando ? "Enviando..." : "Pedir el arrepentimiento"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
