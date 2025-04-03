import connection from "../utils/db.js";

class Producto {
  // constructor(nombre, descripcion, precio, categoria_id, id) {
  //   this.nombre = nombre;
  //   this.descripcion = descripcion;
  //   this.precio = precio;
  //   this.categoria_id = categoria_id;
  //   this.id = id;
  // }

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

  async create(nombre, descripcion, precio, categoria_id) {
    try {
      const [result] = await connection.query("INSERT INTO productos (nombre, descripcion, precio, categoria_id) VALUES (?,?,?,?)", [nombre, descripcion, precio, categoria_id]);
      return { id: result.id, nombre, descripcion, precio, categoria_id };
    } catch (error) {
      throw new Error("Error al guardar producto");
    }
  }

  async update(nombre, descripcion, precio, categoria_id, id) {
    try {
      await connection.query("UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, categoria_id = ? WHERE id = ?", [nombre, descripcion, precio, categoria_id, id]);
      if (result.affectedRows == 0) throw new Error("Producto no encontrado");
      return { id, nombre, descripcion, precio, categoria_id };
    } catch (error) {
      throw new Error("Error al actualizar el producto");
    }
  }

  async partialUpdate(id, campos) {
    try {

      let comando = "";
      for (const propiedad in campos) {
        comando += `${propiedad} = "${campos[propiedad]}", `
      }

      comando = comando.substring(0, comando.length - 2);
      const [result] = await connection.query(`UPDATE productos SET ${comando} WHERE id = ?`, [id]);
      
      if (result.affectedRows == 0) throw new Error("Producto no encontrado");

    } catch (error) {
      throw new Error("Error al actualizar el producto");
    }
  }

  async delete(id) {
    try {
      const [result] = await connection.query("DELETE FROM productos WHERE id = ?", [id]);
      if (result.affectedRows == 0) throw new Error("Producto no encontrada");
    } catch (error) {
      throw new Error("Error al eliminar el producto");
    }
  }
};

export default Producto;