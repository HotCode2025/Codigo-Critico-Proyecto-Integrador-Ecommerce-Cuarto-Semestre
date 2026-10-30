"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { crearProducto } from "@/lib/admin-api";
import { SoloAdmin } from "@/components/admin/solo-admin";
import { ProductoForm } from "@/components/admin/producto-form";

function NuevoProducto() {
  const { token } = useAuth();
  const router = useRouter();

  async function guardar(datos) {
    await crearProducto(token, datos);
    router.push("/admin");
  }

  return (
    <div className="min-h-screen px-8 py-12 sm:px-16 max-w-4xl">
      <Link href="/admin" className="text-sm text-muted-foreground hover:text-gold transition-colors">
        ← Volver al panel
      </Link>
      <h1 className="font-serif text-4xl text-foreground mt-6 mb-8">Nuevo producto</h1>
      <ProductoForm textoBoton="Crear producto" onGuardar={guardar} />
    </div>
  );
}

export default function NuevoProductoPage() {
  return (
    <SoloAdmin>
      <NuevoProducto />
    </SoloAdmin>
  );
}
