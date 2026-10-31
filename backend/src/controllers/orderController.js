const prisma = require("../lib/prisma");

async function listar(req, res) {
  const pedidos = await prisma.pedido.findMany({
    where: { usuarioId: req.usuario.id },
    include: { items: { include: { producto: true } } },
    orderBy: { fecha: "desc" },
  });

  res.json(pedidos);
}

async function obtenerPorId(req, res) {
  const id = Number(req.params.id);
  const pedido = await prisma.pedido.findUnique({
    where: { id },
    include: { items: { include: { producto: true } } },
  });

  if (!pedido || pedido.usuarioId !== req.usuario.id) {
    return res.status(404).json({ error: "Pedido no encontrado" });
  }

  res.json(pedido);
}

const ESTADOS_VALIDOS = ["PENDIENTE", "PAGADO", "ENVIADO", "CANCELADO"];

async function listarTodos(req, res) {
  const { estado } = req.query;

  if (estado && !ESTADOS_VALIDOS.includes(estado)) {
    return res.status(400).json({ error: "Estado inválido" });
  }

  const pedidos = await prisma.pedido.findMany({
    where: estado ? { estado } : undefined,
    include: {
      usuario: { select: { nombre: true, email: true } },
      items: { include: { producto: true } },
    },
    orderBy: { fecha: "desc" },
  });

  res.json(pedidos);
}

module.exports = { listar, obtenerPorId, listarTodos };
