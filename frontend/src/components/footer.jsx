import Link from "next/link";
import { Divider } from "@/components/divider";
import { EMAIL_ATENCION } from "@/lib/tienda";

const enlace = "text-muted-foreground hover:text-gold transition-colors";

function Columna({ titulo, children }) {
  return (
    <div>
      <h3 className="font-serif text-base text-foreground mb-4">{titulo}</h3>
      <div className="space-y-3 text-sm">{children}</div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/60 px-8 py-12 sm:px-16 mt-24">
      <div className="max-w-5xl mx-auto">
        <Divider />

        <div className="text-center sm:text-left mt-8">
          <p className="font-serif text-xl text-foreground">Altos del Uco</p>
          <p className="text-sm text-muted-foreground mt-1">
            Vinos de bodegas boutique del Valle de Uco, Mendoza.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
          <Columna titulo="Atención al cliente">
            <p className="text-muted-foreground">
              Escribinos por email:
              <br />
              <a href={`mailto:${EMAIL_ATENCION}`} className="text-gold hover:underline break-all">
                {EMAIL_ATENCION}
              </a>
            </p>
          </Columna>

          <Columna titulo="Preguntas generales">
            <p>
              <Link href="/privacidad" className={enlace}>
                Política de privacidad
              </Link>
            </p>
            <p>
              <Link href="/terminos" className={enlace}>
                Términos y condiciones
              </Link>
            </p>
            <p>
              <Link href="/medios-de-pago-y-envio" className={enlace}>
                Medios de pago y envío
              </Link>
            </p>
            <p>
              <Link
                href="/arrepentimiento"
                className="inline-block rounded border border-gold/50 px-3 py-1.5 text-foreground hover:bg-gold/10 transition-colors"
              >
                Arrepentimiento de compra
              </Link>
            </p>
          </Columna>

          <Columna titulo="Comprá seguro">
            <p className="text-muted-foreground">
              Los pagos los procesa Mercado Pago. Los datos de tu tarjeta nunca pasan por esta tienda ni se
              guardan en ella.
            </p>
          </Columna>

          <Columna titulo="Tu tienda">
            <p>
              <Link href="/" className={enlace}>
                Catálogo
              </Link>
            </p>
            <p>
              <Link href="/carrito" className={enlace}>
                Carrito
              </Link>
            </p>
            <p>
              <Link href="/pedidos" className={enlace}>
                Mis pedidos
              </Link>
            </p>
            <p className="text-muted-foreground">Envíos a domicilio dentro de Argentina.</p>
          </Columna>
        </div>

        <p className="text-center text-xs text-muted-foreground/70 mt-12">
          Beber con moderación. Venta exclusiva para mayores de 18 años.
        </p>
      </div>
    </footer>
  );
}
