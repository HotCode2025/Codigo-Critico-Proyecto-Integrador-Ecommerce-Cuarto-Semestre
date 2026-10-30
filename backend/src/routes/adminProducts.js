const { Router } = require("express");
const { requiereAuth } = require("../middleware/auth");
const { requiereAdmin } = require("../middleware/admin");
const { listar, crear, actualizar, eliminar } = require("../controllers/adminProductController");

const router = Router();

router.use(requiereAuth, requiereAdmin);

router.get("/", listar);
router.post("/", crear);
router.put("/:id", actualizar);
router.delete("/:id", eliminar);

module.exports = router;
