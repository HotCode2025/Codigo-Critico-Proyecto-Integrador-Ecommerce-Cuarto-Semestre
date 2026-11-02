const prisma = require("./prisma");
const { resend } = require("./resend");

const REMITENTE = process.env.RESEND_FROM_EMAIL || "Altos del Uco <onboarding@resend.dev>";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

function escaparHtml(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatearPrecio(precio) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(
    Number(precio)
  );
}

function formatearFecha(fecha) {
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(new Date(fecha));
}

// Arma el HTML del mail. No es una factura fiscal y el mensaje lo aclara.
function construirHtml(pedido) {
  const subtotal = Number(pedido.total) - Number(pedido.costoEnvio);
  const filas = pedido.items
    .map(
      (item) => `
        <tr>
          <td style="padding:6px 0">${escaparHtml(item.producto.nombre)}<br><span style="color:#777;font-size:12px">${escaparHtml(item.producto.bodega)}</span></td>
          <td style="padding:6px 8px;text-align:center">${item.cantidad}</td>
          <td style="padding:6px 0;text-align:right">${formatearPrecio(item.cantidad * Number(item.precioUnitario))}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#222">
      <h2 style="margin-bottom:4px">Altos del Uco</h2>
      <h3 style="margin-top:0">Comprobante de compra — Pedido #${pedido.id}</h3>
      <p>Hola ${escaparHtml(pedido.usuario.nombre)}, recibimos tu pago. Estos son los datos de tu compra del ${escaparHtml(formatearFecha(pedido.fecha))}.</p>

      <table style="width:100%;border-collapse:collapse;border-top:1px solid #ddd;border-bottom:1px solid #ddd">
        <thead>
          <tr style="text-align:left;font-size:12px;color:#777">
            <th style="padding:6px 0">Producto</th><th style="padding:6px 8px;text-align:center">Cant.</th><th style="padding:6px 0;text-align:right">Importe</th>
          </tr>
        </thead>
        <tbody>${filas}</tbody>
      </table>

      <p style="text-align:right;margin:12px 0 0">Subtotal: ${formatearPrecio(subtotal)}</p>
      <p style="text-align:right;margin:2px 0">Envío: ${Number(pedido.costoEnvio) > 0 ? formatearPrecio(pedido.costoEnvio) : "Gratis"}</p>
      <p style="text-align:right;margin:2px 0;font-size:18px"><strong>Total: ${formatearPrecio(pedido.total)}</strong></p>

      <p><strong>Dirección de envío:</strong><br>${escaparHtml(pedido.direccionCalle)}, ${escaparHtml(pedido.direccionCiudad)}, ${escaparHtml(pedido.direccionProvincia)} (CP ${escaparHtml(pedido.direccionCodigoPostal)})</p>

      <p>Podés ver el estado de tu pedido y el comprobante imprimible en
        <a href="${FRONTEND_URL}/pedidos/${pedido.id}">Mis pedidos</a>.</p>

      <p style="font-size:12px;color:#777;border-top:1px solid #ddd;padding-top:10px">
        Este comprobante <strong>no es una factura fiscal</strong>. Es la constancia de tu compra en Altos del Uco.
      </p>
    </div>`;
}

// Manda el comprobante al cliente. Lo llama confirmarPago sólo cuando ESA llamada
// fue la que pasó el pedido a PAGADO, así que sale una vez por pedido.
async function enviarComprobante(pedidoId) {
  if (!resend) {
    console.warn(`RESEND_API_KEY no configurada. Comprobante del pedido #${pedidoId} sin enviar.`);
    return;
  }

  const pedido = await prisma.pedido.findUnique({
    where: { id: pedidoId },
    include: {
      usuario: { select: { nombre: true, email: true } },
      items: { include: { producto: { select: { nombre: true, bodega: true } } } },
    },
  });
  if (!pedido) return;

  // El SDK de Resend no lanza un error si falla: lo devuelve en `error`.
  const { error } = await resend.emails.send({
    from: REMITENTE,
    to: pedido.usuario.email,
    subject: `Comprobante de compra — Pedido #${pedido.id}`,
    html: construirHtml(pedido),
  });
  if (error) throw new Error(error.message || "No se pudo enviar el comprobante");
}

module.exports = { enviarComprobante, construirHtml };
