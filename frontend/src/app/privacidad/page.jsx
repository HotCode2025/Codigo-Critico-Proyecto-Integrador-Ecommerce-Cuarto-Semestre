import Link from "next/link";
import { PaginaLegal, Seccion } from "@/components/pagina-legal";
import { EMAIL_ATENCION } from "@/lib/tienda";

export const metadata = {
  title: "Política de privacidad — Altos del Uco",
};

export default function PrivacidadPage() {
  return (
    <PaginaLegal titulo="Política de privacidad" actualizacion="2 de noviembre de 2026">
      <p>
        Altos del Uco es un proyecto integrador de la materia Programación IV. Esta política explica qué datos
        recibimos de las personas que usan el sitio y para qué los usamos.
      </p>

      <Seccion titulo="Qué datos recopilamos">
        <ul className="list-disc pl-5 space-y-1">
          <li>Al registrarte: tu nombre, tu email, tu fecha de nacimiento (para verificar que sos mayor de 18 años) y tu contraseña.</li>
          <li>Al comprar: la dirección de envío (calle, ciudad, provincia y código postal) y el detalle de tus pedidos.</li>
        </ul>
        <p>
          Tu contraseña se guarda cifrada: ni nosotros podemos leerla. Los datos de tu tarjeta{" "}
          <strong className="text-foreground">no los recibimos ni los guardamos</strong>: el pago se hace en
          Mercado Pago.
        </p>
      </Seccion>

      <Seccion titulo="Para qué los usamos">
        <ul className="list-disc pl-5 space-y-1">
          <li>Gestionar tu cuenta y tus pedidos, y enviarte lo que compraste.</li>
          <li>Verificar que sos mayor de edad, requisito para la venta de alcohol.</li>
          <li>Enviarte mails relacionados con tu cuenta, como el de recuperación de contraseña.</li>
        </ul>
        <p>No usamos tus datos para publicidad ni los vendemos.</p>
      </Seccion>

      <Seccion titulo="Con quién los compartimos">
        <p>Solo con los servicios necesarios para que la tienda funcione:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Mercado Pago, que procesa los pagos.</li>
          <li>Resend, que envía los mails del sistema.</li>
          <li>Vercel, Render y Neon, donde está alojado el sitio y su base de datos.</li>
        </ul>
      </Seccion>

      <Seccion titulo="Tus derechos">
        <p>
          Podés pedir acceso, corrección o eliminación de tus datos personales escribiendo a{" "}
          <a href={`mailto:${EMAIL_ATENCION}`} className="text-gold hover:underline">
            {EMAIL_ATENCION}
          </a>
          . La titular de los datos personales tiene la facultad de ejercer el derecho de acceso en forma
          gratuita a intervalos no inferiores a seis meses (Ley 25.326). La Agencia de Acceso a la Información
          Pública es el órgano de control de esa ley.
        </p>
      </Seccion>

      <p>
        Ver también los{" "}
        <Link href="/terminos" className="text-gold hover:underline">
          términos y condiciones
        </Link>
        .
      </p>
    </PaginaLegal>
  );
}
