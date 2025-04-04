import Producto from "../Models/Producto.js";

class ProductoController {

  static getAllProductos = async (req, res) => {
    const OBJProducto = new Producto();
    const productos = await OBJProducto.getAll();
    res.json(productos);
  }

  static createProducto = async (req, res) => {
    
    try {
      const { nombre, descripcion, precio, producto_id } = req.body;
    
      const OBJProducto = new Producto();
      const producto = await OBJProducto.create(nombre, descripcion, precio, producto_id);
      res.status(201).json(producto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static updateProducto = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion, precio, producto_id } = req.body;
    
      const OBJProducto = new Producto();
      const producto = await OBJProducto.update(nombre, descripcion, precio, producto_id, id);
      res.status(201).json(producto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static partialUpdateProducto = async (req, res) => {
    try {
      const { id } = req.params;
      const campos = req.body;
      const OBJProducto = new Producto();
      const producto = await OBJProducto.partialUpdate(id, campos);
      res.status(201).json({mensaje: producto.mensaje});
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static deleteProducto = async (req, res) => {
    try {
      const { id } = req.params;
    
      const OBJProducto = new Producto();
      const producto = await OBJProducto.delete(id);
      res.status(201).json({mensaje: producto.mensaje});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default ProductoController;