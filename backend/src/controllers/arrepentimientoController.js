const prisma = require("../lib/prisma");
const { resend } = require("../lib/resend");

// Mail al que llegan los pedidos de arrepentimiento (y que se muestra en el footer).
const EMAIL_TIENDA = process.env.EMAIL_TIENDA || "arielmazara@gmail.com";
const REMITENTE = process.env.RESEND_FROM_EMAIL || "Altos del Uco <onboarding@resend.dev>";

// Sólo se puede pedir el arrepentimiento de un pedido que ya se pagó.
const ESTADOS_PERMITIDOS = ["PAGADO", "ENVIADO"];
const LARGO_MAXIMO_MOTIVO = 1000;

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

// El SDK de Resend no lanza un error si el envío falla: lo devuelve en `error`.
async function enviarMail(datos) {
  const { error } = await resend.emails.send({ from: REMITENTE, ...datos });
  if (error) throw new Error(error.message || "No se pudo enviar el mail");
}

async function solicitar(req, res) {
  const { pedidoId, email, motivo } = req.body;
  const id = Number(pedidoId);

  if (!Number.isInteger(id) || id <= 0 || typeof email !== "string" || !email.trim()) {
    return res.status(400).json({ error: "Completá el número de pedido y el email con el que compraste" });
  }

  const motivoLimpio = typeof motivo === "string" ? motivo.trim().slice(0, LARGO_MAXIMO_MOTIVO) : "";

  const pedido = await prisma.pedido.findUnique({
    where: { id },
    include: {
      usuario: { select: { nombre: true, email: true } },
      items: { include: { producto: { select: { nombre: true } } } },
    },
  });

  // Mismo mensaje si el pedido no existe o el email no es el de la compra, para
  // no revelar qué pedidos existen.
  if (!pedido || pedido.usuario.email.toLowerCase() !== email.trim().toLowerCase()) {
    return res.status(404).json({ error: "No encontramos un pedido con esos datos" });
  }

  if (!ESTADOS_PERMITIDOS.includes(pedido.estado)) {
    return res.status(400).json({ error: "Sólo se puede pedir el arrepentimiento de pedidos que ya fueron pagados" });
  }

  if (!resend) {
    console.warn(`RESEND_API_KEY no configurada. Arrepentimiento del pedido #${id} sin enviar.`);
    return res
      .status(503)
      .json({ error: `No pudimos enviar tu solicitud en este momento. Escribinos a ${EMAIL_TIENDA}` });
  }

  const productos = pedido.items
    .map((item) => `<li>${item.cantidad} × ${escaparHtml(item.producto.nombre)}</li>`)
    .join("");

  try {
    await enviarMail({
      to: EMAIL_TIENDA,
      replyTo: pedido.usuario.email,
      subject: `Arrepentimiento de compra — Pedido #${id}`,
      html: `
        <p>Se recibió un pedido de arrepentimiento de compra.</p>
        <ul>
          <li><strong>Pedido:</strong> #${id} (${escaparHtml(pedido.estado)})</li>
          <li><strong>Cliente:</strong> ${escaparHtml(pedido.usuario.nombre)} (${escaparHtml(pedido.usuario.email)})</li>
          <li><strong>Total:</strong> ${formatearPrecio(pedido.total)}</li>
        </ul>
        <p><strong>Productos:</strong></p>
        <ul>${productos}</ul>
        <p><strong>Motivo:</strong> ${motivoLimpio ? escaparHtml(motivoLimpio) : "No indicó un motivo."}</p>
      `,
    });
  } catch (err) {
    console.error("No se pudo enviar el mail de arrepentimiento:", err);
    return res
      .status(502)
      .json({ error: `No pudimos enviar tu solicitud en este momento. Escribinos a ${EMAIL_TIENDA}` });
  }

  // Copia para el cliente. Si falla no se cancela la solicitud, que ya llegó a la tienda.
  try {
    await enviarMail({
      to: pedido.usuario.email,
      subject: `Recibimos tu pedido de arrepentimiento — Pedido #${id}`,
      html: `
        <p>Hola ${escaparHtml(pedido.usuario.nombre)},</p>
        <p>Recibimos tu pedido de arrepentimiento de compra del <strong>pedido #${id}</strong>.
        Nos vamos a comunicar con vos para coordinar la devolución y el reembolso.</p>
        <p>Si no fuiste vos, ignorá este mensaje.</p>
      `,
    });
  } catch (err) {
    console.warn("No se pudo enviar la copia al cliente:", err.message);
  }

  res.status(201).json({
    mensaje: `Recibimos tu pedido de arrepentimiento del pedido #${id}. Nos vamos a comunicar con vos.`,
  });
}

module.exports = { solicitar };
