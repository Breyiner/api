import Categoria from "../Models/Categoria.js";

class CategoriaController {

  static getAllCategorias = async (req, res) => {
    const OBJCategoria = new Categoria();
    const categorias = await OBJCategoria.getAll();
    res.json(categorias);
  }

  static createCategoria = async (req, res) => {
    
    try {
      const { nombre, descripcion } = req.body;
    
      const OBJCategoria = new Categoria(nombre, descripcion);
      const categoria = await OBJCategoria.create();
      res.status(201).json(categoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default CategoriaController;