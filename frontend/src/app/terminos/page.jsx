import Link from "next/link";
import { PaginaLegal, Seccion } from "@/components/pagina-legal";

export const metadata = {
  title: "Términos y condiciones — Altos del Uco",
};

export default function TerminosPage() {
  return (
    <PaginaLegal titulo="Términos y condiciones" actualizacion="2 de noviembre de 2026">
      <p>
        Al usar este sitio y comprar en él aceptás estas condiciones. Altos del Uco es un proyecto integrador de
        la materia Programación IV, desarrollado con fines académicos.
      </p>

      <Seccion titulo="Quiénes pueden comprar">
        <p>
          La venta de bebidas alcohólicas es exclusiva para <strong className="text-foreground">mayores de 18 años</strong>.
          Para registrarte te pedimos tu fecha de nacimiento y no podemos crear cuentas de menores.
        </p>
      </Seccion>

      <Seccion titulo="Productos y precios">
        <ul className="list-disc pl-5 space-y-1">
          <li>Los precios están expresados en pesos argentinos (ARS).</li>
          <li>Cada producto tiene un stock limitado. Si no hay stock suficiente, no se puede agregar al carrito ni comprar.</li>
          <li>El stock se descuenta recién cuando el pago queda aprobado.</li>
        </ul>
      </Seccion>

      <Seccion titulo="Cómo se compra">
        <p>
          El pedido se crea cuando completás la dirección de envío y pasás a pagar. Queda <em>pendiente</em> hasta
          que Mercado Pago confirma el pago: ahí pasa a <em>pagado</em>. Más adelante la tienda lo marca como{" "}
          <em>enviado</em> y podés ver el transportista y el número de seguimiento en «Mis pedidos». Detalles en{" "}
          <Link href="/medios-de-pago-y-envio" className="text-gold hover:underline">
            Medios de pago y envío
          </Link>
          .
        </p>
      </Seccion>

      <Seccion titulo="Derecho de arrepentimiento">
        <p>
          Podés arrepentirte de la compra dentro de los <strong className="text-foreground">10 días corridos</strong>{" "}
          de recibido el producto, sin necesidad de indicar el motivo (Ley 24.240 de Defensa del Consumidor). Para
          hacerlo usá el botón{" "}
          <Link href="/arrepentimiento" className="text-gold hover:underline">
            Arrepentimiento de compra
          </Link>
          .
        </p>
      </Seccion>

      <Seccion titulo="Uso responsable">
        <p>Beber con moderación. Está prohibida la venta de alcohol a menores de 18 años.</p>
      </Seccion>

      <p>
        Ver también la{" "}
        <Link href="/privacidad" className="text-gold hover:underline">
          política de privacidad
        </Link>
        .
      </p>
    </PaginaLegal>
  );
}
