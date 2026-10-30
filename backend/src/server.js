require("dotenv/config");
const express = require("express");
const cors = require("cors");
const adminProductRoutes = require("./routes/adminProducts");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/admin/productos", adminProductRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/productos", productRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Error interno del servidor" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor de Altos del Uco corriendo en http://localhost:${PORT}`);
});
