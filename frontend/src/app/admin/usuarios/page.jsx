"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { listarUsuariosAdmin, cambiarRolUsuario } from "@/lib/admin-api";
import { SoloAdmin } from "@/components/admin/solo-admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function formatearFecha(fecha) {
  return new Intl.DateTimeFormat("es-AR", { dateStyle: "long" }).format(new Date(fecha));
}

function ListaUsuarios() {
  const { token, usuario: yo } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [guardandoId, setGuardandoId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    listarUsuariosAdmin(token)
      .then(setUsuarios)
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, [token]);

  async function cambiarRol(usuario, rol) {
    const accion = rol === "ADMIN" ? "dar el rol de administrador a" : "quitar el rol de administrador a";
    if (!window.confirm(`¿Querés ${accion} ${usuario.nombre} (${usuario.email})?`)) return;

    setError("");
    setGuardandoId(usuario.id);
    try {
      const actualizado = await cambiarRolUsuario(token, usuario.id, rol);
      setUsuarios((prev) => prev.map((u) => (u.id === actualizado.id ? actualizado : u)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo cambiar el rol");
    } finally {
      setGuardandoId(null);
    }
  }

  const texto = busqueda.trim().toLowerCase();
  const visibles = texto
    ? usuarios.filter((u) => u.nombre.toLowerCase().includes(texto) || u.email.toLowerCase().includes(texto))
    : usuarios;

  return (
    <div className="min-h-screen px-8 py-12 sm:px-16">
      <Link href="/admin" className="text-sm text-muted-foreground hover:text-gold transition-colors">
        ← Volver al panel
      </Link>

      <div className="flex flex-wrap items-end justify-between gap-4 mt-6 mb-8">
        <div>
          <p className="font-script text-3xl text-gold">Panel de administración</p>
          <h1 className="font-serif text-4xl text-foreground">Usuarios</h1>
        </div>
        <Input
          placeholder="Buscar por nombre o email"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full sm:w-72"
        />
      </div>

      <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
        Acá se da o se quita el rol de administrador a las cuentas ya registradas. Para alguien que todavía no se
        registró, su email se agrega en la variable ADMIN_EMAILS del servidor.
      </p>

      {error && <p className="text-sm text-destructive mb-6">{error}</p>}

      {cargando ? (
        <p className="text-muted-foreground">Cargando usuarios...</p>
      ) : visibles.length === 0 ? (
        <p className="text-muted-foreground">
          {texto ? "No hay usuarios que coincidan con la búsqueda." : "Todavía no hay usuarios."}
        </p>
      ) : (
        <ul className="divide-y divide-border/60 border-y border-border/60">
          {visibles.map((u) => (
            <li key={u.id} className="flex flex-wrap items-center gap-4 py-4">
              <div className="flex-1 min-w-48">
                <p className="font-serif text-lg text-foreground leading-snug break-words">{u.nombre}</p>
                <p className="text-sm text-muted-foreground break-all">{u.email}</p>
                <p className="text-xs text-muted-foreground">Registrado el {formatearFecha(u.createdAt)}</p>
              </div>

              <div className="w-32">
                {u.rol === "ADMIN" ? <Badge>Administrador</Badge> : <Badge variant="outline">Cliente</Badge>}
              </div>

              <div className="sm:w-56 flex sm:justify-end">
                {u.id === yo.id ? (
                  <span className="text-sm text-muted-foreground">Tu cuenta</span>
                ) : u.rol === "ADMIN" ? (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={guardandoId === u.id}
                    onClick={() => cambiarRol(u, "CLIENTE")}
                  >
                    Quitar rol de administrador
                  </Button>
                ) : (
                  <Button size="sm" disabled={guardandoId === u.id} onClick={() => cambiarRol(u, "ADMIN")}>
                    Hacer administrador
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AdminUsuariosPage() {
  return (
    <SoloAdmin>
      <ListaUsuarios />
    </SoloAdmin>
  );
}
