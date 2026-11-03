const { Router } = require("express");
const { requiereAuth } = require("../middleware/auth");
const { requiereAdmin } = require("../middleware/admin");
const { listar, cambiarRol } = require("../controllers/adminUserController");

const router = Router();

router.use(requiereAuth, requiereAdmin);

router.get("/", listar);
router.patch("/:id/rol", cambiarRol);

module.exports = router;
