import connection from "../utils/db.js";

class Producto {
  constructor(nombre, descripcion, precio, categoria_id, id) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.categoria_id = categoria_id;
    this.id = id;
  }

  /**
   * Método para obtener los registros de la base de datos
   * @returns {Array} Listado de los productos en un arreglo
   */
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM productos");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los productos");
    }
  }

  async create() {
    try {
      const [result] = await connection.query("INSERT INTO productos (nombre, descripcion, precio, categoria_id) VALUES (?,?,?,?)", [this.nombre, this.descripcion, this.precio, this.categoria_id]);
      return {
        id: result.id,
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio,
        categoria_id: this.categoria_id
      };
    } catch (error) {
      throw new Error("Error al guardar producto");
    }
  }

  async update() {
    try {
      await connection.query("UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, categoria_id = ? WHERE id = ?", [this.nombre, this.descripcion, this.precio, this.categoria_id, this.id]);
      return {
        id: this.id,
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio,
        categoria_id: this.categoria_id
      };
    } catch (error) {
      throw new Error("Error al actualizar la categoría");
    }
  }

  async delete(id) {
    try {
      await connection.query("DELETE FROM productos WHERE id = ?", [id]);
      return {
        id: id
      };
    } catch (error) {
      throw new Error("Error al eliminar el producto");
    }
  }
};

export default Producto;