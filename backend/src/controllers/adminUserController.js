const prisma = require("../lib/prisma");

const ROLES_VALIDOS = ["ADMIN", "CLIENTE"];

// Solo los datos que necesita el panel: nunca la contraseña ni el token de
// recuperación.
const USUARIO_PUBLICO = {
  id: true,
  nombre: true,
  email: true,
  rol: true,
  createdAt: true,
};

async function listar(req, res) {
  const usuarios = await prisma.usuario.findMany({
    select: USUARIO_PUBLICO,
    orderBy: [{ rol: "asc" }, { nombre: "asc" }],
  });

  res.json(usuarios);
}

async function cambiarRol(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  const { rol } = req.body ?? {};
  if (!ROLES_VALIDOS.includes(rol)) {
    return res.status(400).json({ error: "El rol debe ser ADMIN o CLIENTE" });
  }

  // Un administrador no puede cambiarse su propio rol: así la tienda nunca
  // se queda sin administradores por un clic equivocado.
  if (id === req.usuario.id) {
    return res.status(400).json({ error: "No podés cambiar tu propio rol" });
  }

  const existente = await prisma.usuario.findUnique({ where: { id }, select: { id: true } });
  if (!existente) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  const usuario = await prisma.usuario.update({
    where: { id },
    data: { rol },
    select: USUARIO_PUBLICO,
  });

  res.json(usuario);
}

module.exports = { listar, cambiarRol };
