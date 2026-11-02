"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { listarPedidosAdmin, marcarPedidoEnviado, subirFacturaPedido } from "@/lib/admin-api";
import { descargarFactura } from "@/lib/api";
import { SoloAdmin } from "@/components/admin/solo-admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ESTADOS_PEDIDO } from "@/lib/estados-pedido";

const TODOS = "__todos__";

function formatearPrecio(precio) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(Number(precio));
}

function formatearFecha(fecha) {
  return new Intl.DateTimeFormat("es-AR", { dateStyle: "long" }).format(new Date(fecha));
}

function FormularioEnvio({ pedido, token, onGuardado }) {
  const [transportista, setTransportista] = useState(pedido.transportista || "");
  const [numeroSeguimiento, setNumeroSeguimiento] = useState(pedido.numeroSeguimiento || "");
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  async function guardar(e) {
    e.preventDefault();
    setError("");
    setGuardando(true);
    try {
      await marcarPedidoEnviado(token, pedido.id, { transportista, numeroSeguimiento });
      onGuardado();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo marcar como enviado");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <form onSubmit={guardar} className="flex flex-wrap items-end gap-2 mt-3">
      <Input
        placeholder="Transportista"
        value={transportista}
        onChange={(e) => setTransportista(e.target.value)}
        className="w-40"
        required
      />
      <Input
        placeholder="N° de seguimiento"
        value={numeroSeguimiento}
        onChange={(e) => setNumeroSeguimiento(e.target.value)}
        className="w-44"
        required
      />
      <Button type="submit" size="sm" disabled={guardando}>
        {guardando
          ? "Guardando..."
          : pedido.estado === "ENVIADO"
          ? "Actualizar seguimiento"
          : "Marcar como enviado"}
      </Button>
      {error && <p className="text-sm text-destructive w-full">{error}</p>}
    </form>
  );
}

const TAMANIO_MAXIMO_FACTURA = 2 * 1024 * 1024;

function FormularioFactura({ pedido, token, onGuardado }) {
  const [archivo, setArchivo] = useState(null);
  const [clave, setClave] = useState(0);
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState("");

  function elegirArchivo(e) {
    const elegido = e.target.files[0] || null;
    setError("");
    if (elegido && elegido.type !== "application/pdf") {
      setError("El archivo tiene que ser un PDF");
      setArchivo(null);
    } else if (elegido && elegido.size > TAMANIO_MAXIMO_FACTURA) {
      setError("El PDF supera los 2 MB");
      setArchivo(null);
    } else {
      setArchivo(elegido);
    }
  }

  async function subir(e) {
    e.preventDefault();
    if (!archivo) return;
    setError("");
    setSubiendo(true);
    try {
      await subirFacturaPedido(token, pedido.id, archivo);
      setArchivo(null);
      setClave((c) => c + 1);
      onGuardado();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo adjuntar la factura");
    } finally {
      setSubiendo(false);
    }
  }

  async function descargar() {
    setError("");
    try {
      await descargarFactura(token, pedido.id, pedido.factura.nombreArchivo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo descargar la factura");
    }
  }

  return (
    <div className="mt-3 pt-3 border-t border-border/40">
      {pedido.factura ? (
        <div className="flex items-center justify-between gap-4 mb-2">
          <p className="text-sm text-muted-foreground">
            Factura: <span className="text-foreground">{pedido.factura.nombreArchivo}</span> · cargada el{" "}
            {formatearFecha(pedido.factura.createdAt)}
          </p>
          <Button type="button" size="sm" variant="ghost" onClick={descargar}>
            Descargar
          </Button>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground mb-2">Sin factura adjunta.</p>
      )}
      <form onSubmit={subir} className="flex flex-wrap items-center gap-2">
        <Input
          key={clave}
          type="file"
          accept="application/pdf"
          onChange={elegirArchivo}
          className="w-72"
        />
        <Button type="submit" size="sm" variant="outline" disabled={!archivo || subiendo}>
          {subiendo ? "Subiendo..." : pedido.factura ? "Reemplazar factura" : "Adjuntar factura (PDF)"}
        </Button>
      </form>
      {error && <p className="text-sm text-destructive mt-2">{error}</p>}
    </div>
  );
}

function ListaPedidos() {
  const { token } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [estado, setEstado] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [editandoEnvioId, setEditandoEnvioId] = useState(null);

  function cargarPedidos() {
    setCargando(true);
    setError("");
    listarPedidosAdmin(token, estado)
      .then(setPedidos)
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }

  useEffect(() => {
    cargarPedidos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, estado]);

  function alGuardarEnvio() {
    setEditandoEnvioId(null);
    cargarPedidos();
  }

  return (
    <div className="min-h-screen px-8 py-12 sm:px-16">
      <Link href="/admin" className="text-sm text-muted-foreground hover:text-gold transition-colors">
        ← Volver al panel
      </Link>

      <div className="flex flex-wrap items-end justify-between gap-4 mt-6 mb-8">
        <div>
          <p className="font-script text-3xl text-gold">Panel de administración</p>
          <h1 className="font-serif text-4xl text-foreground">Pedidos y envíos</h1>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Estado</label>
          <Select value={estado || TODOS} onValueChange={(v) => setEstado(v === TODOS ? "" : v)}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Todos" /></SelectTrigger>
            <SelectContent>
              <SelectItem value={TODOS}>Todos</SelectItem>
              {Object.entries(ESTADOS_PEDIDO).map(([valor, { etiqueta }]) => (
                <SelectItem key={valor} value={valor}>{etiqueta}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && <p className="text-sm text-destructive mb-6">{error}</p>}

      {cargando ? (
        <p className="text-muted-foreground">Cargando pedidos...</p>
      ) : pedidos.length === 0 ? (
        <p className="text-muted-foreground">
          {estado ? "No hay pedidos con ese estado." : "Todavía no hay pedidos."}
        </p>
      ) : (
        <div className="space-y-4 max-w-3xl">
          {pedidos.map((pedido) => {
            const estadoPedido = ESTADOS_PEDIDO[pedido.estado];
            const editandoEnvio = editandoEnvioId === pedido.id;

            return (
              <div key={pedido.id} className="border border-border/60 rounded-lg p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-foreground">
                      Pedido #{pedido.id} — {pedido.usuario.nombre} ({pedido.usuario.email})
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatearFecha(pedido.fecha)} ·{" "}
                      {pedido.items.reduce((acc, i) => acc + i.cantidad, 0)} botellas ·{" "}
                      {formatearPrecio(pedido.total)}
                    </p>
                  </div>
                  <Badge variant="outline" className={estadoPedido.clase}>
                    {estadoPedido.etiqueta}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mt-3">
                  {pedido.direccionCalle}, {pedido.direccionCiudad}, {pedido.direccionProvincia} (CP{" "}
                  {pedido.direccionCodigoPostal})
                </p>

                {pedido.estado === "ENVIADO" && !editandoEnvio && (
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-sm text-muted-foreground">
                      Enviado por <span className="text-foreground">{pedido.transportista}</span> · seguimiento{" "}
                      <span className="text-foreground">{pedido.numeroSeguimiento}</span>
                    </p>
                    <Button size="sm" variant="ghost" onClick={() => setEditandoEnvioId(pedido.id)}>
                      Editar
                    </Button>
                  </div>
                )}

                {(pedido.estado === "PAGADO" || (pedido.estado === "ENVIADO" && editandoEnvio)) && (
                  <FormularioEnvio pedido={pedido} token={token} onGuardado={alGuardarEnvio} />
                )}

                {(pedido.estado === "PAGADO" || pedido.estado === "ENVIADO") && (
                  <FormularioFactura pedido={pedido} token={token} onGuardado={cargarPedidos} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminPedidosPage() {
  return (
    <SoloAdmin>
      <ListaPedidos />
    </SoloAdmin>
  );
}
