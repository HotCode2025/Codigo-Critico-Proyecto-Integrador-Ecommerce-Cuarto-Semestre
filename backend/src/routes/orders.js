const { Router } = require("express");
const { requiereAuth } = require("../middleware/auth");
const { requiereAdmin } = require("../middleware/admin");
const { listar, obtenerPorId, listarTodos } = require("../controllers/orderController");

const router = Router();

router.use(requiereAuth);

// Las rutas de admin van antes de /:id para que "admin" no se tome como un id.
router.get("/admin/todos", requiereAdmin, listarTodos);

router.get("/", listar);
router.get("/:id", obtenerPorId);

module.exports = router;
