import express from "express";
import bodyParser from "body-parser";

import categoriasRoutes from "./routes/categoriasRoutes.js";

import productosRoutes from "./routes/productosRoutes.js";
import CategoriaController from "./controller/categoriaController.js";

const app = express();

app.use(bodyParser.json());

app.use(express.urlencoded({ "extended": true }));

app.use("/categorias", categoriasRoutes);

app.use("/productos", productosRoutes);

app.listen(3000, () => {
  console.log("Servidor en funcionamiento...");
});