const { Router } = require("express");
const { solicitar } = require("../controllers/arrepentimientoController");

const router = Router();

router.post("/", solicitar);

module.exports = router;
