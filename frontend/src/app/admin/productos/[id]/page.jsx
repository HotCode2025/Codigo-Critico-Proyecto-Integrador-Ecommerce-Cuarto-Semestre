"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { obtenerProducto } from "@/lib/api";
import { actualizarProducto } from "@/lib/admin-api";
import { SoloAdmin } from "@/components/admin/solo-admin";
import { ProductoForm } from "@/components/admin/producto-form";

function EditarProducto() {
  const { id } = useParams();
  const { token } = useAuth();
  const router = useRouter();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    obtenerProducto(id)
      .then(setProducto)
      .catch((err) => setError(err.message));
  }, [id]);

  async function guardar(datos) {
    await actualizarProducto(token, id, datos);
    router.push("/admin");
  }

  return (
    <div className="min-h-screen px-8 py-12 sm:px-16 max-w-4xl">
      <Link href="/admin" className="text-sm text-muted-foreground hover:text-gold transition-colors">
        ← Volver al panel
      </Link>
      <h1 className="font-serif text-4xl text-foreground mt-6 mb-8">Editar producto</h1>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {!error && !producto && <p className="text-muted-foreground">Cargando...</p>}
      {producto && (
        <ProductoForm productoInicial={producto} textoBoton="Guardar cambios" onGuardar={guardar} />
      )}
    </div>
  );
}

export default function EditarProductoPage() {
  return (
    <SoloAdmin>
      <EditarProducto />
    </SoloAdmin>
  );
}
