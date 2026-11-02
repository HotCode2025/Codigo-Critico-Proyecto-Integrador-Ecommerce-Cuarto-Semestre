import Link from "next/link";

// Contenedor de las páginas informativas (privacidad, términos, pagos y envío).
export function PaginaLegal({ titulo, actualizacion, children }) {
  return (
    <div className="min-h-screen px-8 py-12 sm:px-16">
      <div className="max-w-3xl">
        <Link href="/" className="text-sm text-muted-foreground hover:text-gold transition-colors">
          ← Volver al catálogo
        </Link>

        <h1 className="font-serif text-4xl text-foreground mt-8">{titulo}</h1>
        {actualizacion && <p className="text-xs text-muted-foreground mt-2">Última actualización: {actualizacion}</p>}

        <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}

export function Seccion({ titulo, children }) {
  return (
    <section className="space-y-2 pt-4">
      <h2 className="font-serif text-xl text-foreground">{titulo}</h2>
      {children}
    </section>
  );
}
