const express = require("express");
const { Router } = express;
const { requiereAuth } = require("../middleware/auth");
const { requiereAdmin } = require("../middleware/admin");
const { listar, obtenerPorId, listarTodos, marcarEnviado } = require("../controllers/orderController");
const { subirFactura, descargarFactura, TAMANIO_MAXIMO } = require("../controllers/facturaController");

const router = Router();

// Cuerpo crudo sólo para la carga de la factura. Si se pasa del límite, el
// parser lanza un error que el manejador general convertiría en un 500.
function leerPdf(req, res, next) {
  express.raw({ type: "application/pdf", limit: TAMANIO_MAXIMO })(req, res, (err) => {
    if (err?.type === "entity.too.large") {
      return res.status(413).json({ error: "El PDF supera los 2 MB" });
    }
    next(err);
  });
}

router.use(requiereAuth);

// Las rutas de admin van antes de /:id para que "admin" no se tome como un id.
router.get("/admin/todos", requiereAdmin, listarTodos);
router.patch("/admin/:id/enviar", requiereAdmin, marcarEnviado);
router.put("/admin/:id/factura", requiereAdmin, leerPdf, subirFactura);

router.get("/", listar);
router.get("/:id/factura", descargarFactura);
router.get("/:id", obtenerPorId);

module.exports = router;
