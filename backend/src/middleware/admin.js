const prisma = require("../lib/prisma");

// Va siempre después de requiereAuth. El rol se vuelve a leer de la base en
// vez de confiar en el que viene en el token: si a alguien le sacan el rol
// ADMIN, pierde el acceso aunque su token (que dura 7 días) siga vigente.
async function requiereAdmin(req, res, next) {
  const usuario = await prisma.usuario.findUnique({
    where: { id: req.usuario.id },
    select: { rol: true },
  });

  if (!usuario || usuario.rol !== "ADMIN") {
    return res.status(403).json({ error: "Acceso solo para administradores" });
  }

  next();
}

module.exports = { requiereAdmin };
