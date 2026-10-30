const prisma = require("../lib/prisma");

const CAMPOS_OBLIGATORIOS = ["nombre", "bodega", "varietal", "region"];
const CAMPOS_OPCIONALES = ["descripcion", "imagenUrl", "notasCata", "maridaje"];
const ANADA_MINIMA = 1900;

function texto(valor) {
  return typeof valor === "string" ? valor.trim() : "";
}

// Valida el body y arma el objeto que se guarda en la base. Devuelve
// { error } si algo no es válido, o { datos } si está todo bien.
function validarProducto(body) {
  const datos = {};

  for (const campo of CAMPOS_OBLIGATORIOS) {
    const valor = texto(body[campo]);
    if (!valor) {
      return { error: `El campo "${campo}" es obligatorio` };
    }
    datos[campo] = valor;
  }

  const anada = Number(body.anada);
  const anioActual = new Date().getFullYear();
  if (!Number.isInteger(anada) || anada < ANADA_MINIMA || anada > anioActual) {
    return { error: `La añada debe ser un año entre ${ANADA_MINIMA} y ${anioActual}` };
  }
  datos.anada = anada;

  const precio = Number(body.precio);
  if (!Number.isFinite(precio) || precio <= 0) {
    return { error: "El precio debe ser un número mayor a 0" };
  }
  datos.precio = precio;

  const stock = Number(body.stock);
  if (!Number.isInteger(stock) || stock < 0) {
    return { error: "El stock debe ser un número entero mayor o igual a 0" };
  }
  datos.stock = stock;

  for (const campo of CAMPOS_OPCIONALES) {
    datos[campo] = texto(body[campo]) || null;
  }

  // Las imágenes se sirven desde frontend/public, así que se aceptan solo
  // rutas locales (por ejemplo "/productos/confin-andino.jpg").
  if (datos.imagenUrl && !datos.imagenUrl.startsWith("/")) {
    return { error: "La imagen debe ser una ruta local que empiece con /" };
  }

  return { datos };
}

// Busca el producto del :id de la URL. Si el id no es un número entero,
// devuelve null igual que si no existiera (en vez de un error de Prisma).
function buscarProducto(idParam, opciones = {}) {
  const id = Number(idParam);
  if (!Number.isInteger(id) || id <= 0) return null;
  return prisma.producto.findUnique({ where: { id }, ...opciones });
}

async function listar(req, res) {
  const productos = await prisma.producto.findMany({
    orderBy: { nombre: "asc" },
  });

  res.json(productos);
}

async function crear(req, res) {
  const { error, datos } = validarProducto(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  const producto = await prisma.producto.create({ data: datos });
  res.status(201).json(producto);
}

async function actualizar(req, res) {
  const existente = await buscarProducto(req.params.id);
  if (!existente) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  const { error, datos } = validarProducto(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  const producto = await prisma.producto.update({ where: { id: existente.id }, data: datos });
  res.json(producto);
}

async function eliminar(req, res) {
  const existente = await buscarProducto(req.params.id, {
    include: { _count: { select: { pedidoItems: true } } },
  });
  if (!existente) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  // Un producto que ya se vendió no se puede borrar, porque los pedidos lo
  // siguen referenciando. En ese caso conviene dejarlo con stock 0.
  if (existente._count.pedidoItems > 0) {
    return res.status(409).json({
      error: "El producto tiene pedidos asociados y no se puede borrar. Dejalo con stock 0 para que no se pueda comprar.",
    });
  }

  // Si estaba en el carrito de algún cliente, se saca de ahí primero.
  await prisma.$transaction([
    prisma.carritoItem.deleteMany({ where: { productoId: existente.id } }),
    prisma.producto.delete({ where: { id: existente.id } }),
  ]);

  res.status(204).end();
}

module.exports = { listar, crear, actualizar, eliminar };
