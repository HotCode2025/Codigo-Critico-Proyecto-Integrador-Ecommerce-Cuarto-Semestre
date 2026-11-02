const prisma = require("../lib/prisma");

const TAMANIO_MAXIMO = 2 * 1024 * 1024;

// El nombre viene del navegador: se deja sólo el último tramo y caracteres
// seguros, porque se vuelve a usar en el encabezado de la descarga.
function limpiarNombre(nombre, pedidoId) {
  const base = String(nombre || "").split(/[\\/]/).pop();
  const seguro = base.replace(/[^A-Za-z0-9._-]/g, "_").slice(0, 100);
  if (!seguro || seguro.replace(/[._]/g, "") === "") return `factura-pedido-${pedidoId}.pdf`;
  return seguro.toLowerCase().endsWith(".pdf") ? seguro : `${seguro}.pdf`;
}

// El archivo llega como cuerpo crudo (Content-Type: application/pdf), no como
// JSON: así no hace falta codificarlo ni subir el límite de tamaño de toda la API.
async function subirFactura(req, res) {
  const pedidoId = Number(req.params.id);
  const archivo = req.body;

  if (!Buffer.isBuffer(archivo) || archivo.length === 0) {
    return res.status(400).json({ error: "Adjuntá un archivo PDF" });
  }
  if (archivo.length > TAMANIO_MAXIMO) {
    return res.status(413).json({ error: "El PDF supera los 2 MB" });
  }
  if (archivo.subarray(0, 5).toString("latin1") !== "%PDF-") {
    return res.status(400).json({ error: "El archivo no es un PDF" });
  }

  const pedido = await prisma.pedido.findUnique({ where: { id: pedidoId } });
  if (!pedido) {
    return res.status(404).json({ error: "Pedido no encontrado" });
  }
  if (pedido.estado !== "PAGADO" && pedido.estado !== "ENVIADO") {
    return res.status(400).json({ error: "Sólo se puede adjuntar factura a un pedido pagado o enviado" });
  }

  const nombreArchivo = limpiarNombre(req.query.nombre, pedidoId);
  const factura = await prisma.facturaPedido.upsert({
    where: { pedidoId },
    create: { pedidoId, nombreArchivo, contenido: archivo },
    update: { nombreArchivo, contenido: archivo, createdAt: new Date() },
    select: { nombreArchivo: true, createdAt: true },
  });

  res.status(201).json(factura);
}

// La puede bajar el dueño del pedido o un administrador. Para cualquier otro
// se responde 404, igual que si no existiera, para no revelar qué pedidos hay.
async function descargarFactura(req, res) {
  const pedidoId = Number(req.params.id);

  const [pedido, usuario] = await Promise.all([
    prisma.pedido.findUnique({ where: { id: pedidoId }, include: { factura: true } }),
    prisma.usuario.findUnique({ where: { id: req.usuario.id }, select: { rol: true } }),
  ]);

  const puedeVerla = pedido && (pedido.usuarioId === req.usuario.id || usuario?.rol === "ADMIN");
  if (!puedeVerla || !pedido.factura) {
    return res.status(404).json({ error: "Factura no encontrada" });
  }

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename="${pedido.factura.nombreArchivo}"`,
  });
  res.send(Buffer.from(pedido.factura.contenido));
}

module.exports = { subirFactura, descargarFactura, limpiarNombre, TAMANIO_MAXIMO };
