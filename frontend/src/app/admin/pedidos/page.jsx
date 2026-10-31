"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { listarPedidosAdmin, marcarPedidoEnviado } from "@/lib/admin-api";
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
