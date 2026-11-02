import Link from "next/link";
import { PaginaLegal, Seccion } from "@/components/pagina-legal";

export const metadata = {
  title: "Medios de pago y envío — Altos del Uco",
};

export default function MediosDePagoYEnvioPage() {
  return (
    <PaginaLegal titulo="Medios de pago y envío" actualizacion="2 de noviembre de 2026">
      <Seccion titulo="Cómo se paga">
        <p>
          Todos los pagos se realizan a través de <strong className="text-foreground">Mercado Pago</strong>, en su
          entorno seguro. Los medios de pago disponibles son los que Mercado Pago te ofrezca al momento de pagar.
        </p>
        <p>
          Esta tienda <strong className="text-foreground">nunca recibe ni guarda los datos de tu tarjeta</strong>.
          Cuando el pago se aprueba, tu pedido pasa a «Pagado».
        </p>
      </Seccion>

      <Seccion titulo="Costo de envío">
        <ul className="list-disc pl-5 space-y-1">
          <li>El envío cuesta una tarifa fija de <strong className="text-foreground">$3.000</strong>.</li>
          <li>Las compras de <strong className="text-foreground">$50.000 o más</strong> tienen envío gratis.</li>
        </ul>
        <p>El costo de envío se muestra en el carrito, antes de pagar, y se cobra junto con tu compra.</p>
      </Seccion>

      <Seccion titulo="Cómo se envía">
        <p>
          Enviamos a domicilio dentro de Argentina, a la dirección que cargás al finalizar la compra. Cuando
          despachamos tu pedido, figura como «Enviado» en{" "}
          <Link href="/pedidos" className="text-gold hover:underline">
            Mis pedidos
          </Link>{" "}
          junto con el nombre del transportista y el número de seguimiento.
        </p>
      </Seccion>

      <Seccion titulo="Estados de tu pedido">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong className="text-foreground">Pendiente de pago:</strong> el pedido se creó y falta completar el pago. Podés retomarlo con «Volver a comprar».</li>
          <li><strong className="text-foreground">Pagado:</strong> Mercado Pago aprobó el pago.</li>
          <li><strong className="text-foreground">Enviado:</strong> el pedido salió con su transportista y número de seguimiento.</li>
          <li><strong className="text-foreground">Cancelado:</strong> el pago fue rechazado o se reemplazó por otro pedido.</li>
        </ul>
      </Seccion>

      <p>
        ¿Querés devolver una compra? Ver{" "}
        <Link href="/arrepentimiento" className="text-gold hover:underline">
          Arrepentimiento de compra
        </Link>
        .
      </p>
    </PaginaLegal>
  );
}
