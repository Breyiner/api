import express from "express";
import CategoriaController from "../controller/CategoriaController.js";

const router = express.Router();

router.get('/', CategoriaController.getAllCategorias);

router.post('/', CategoriaController.createCategoria);

router.put('/:id', CategoriaController.updateCategoria);

export default router;