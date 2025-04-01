import connection from "../utils/db.js";

class Categoria {
  constructor(nombre, descripcion, id) {
    if (id) this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
  }

  /**
   * Método para obtener los registros de la base de datos
   * @returns {Array} Listado de las categorías en un arreglo
   */
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM categorias");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener las categorías");
    }
  }

  async create() {
    try {
      const [result] = await connection.query("INSERT INTO categorias (nombre, descripcion) VALUES (?,?)", [this.nombre, this.descripcion]);
      return {
        id: result.id,
        nombre: this.nombre,
        descripcion: this.descripcion
      };
    } catch (error) {
      throw new Error("Error al guardar categoría");
    }
  }

  async update() {
    try {
      await connection.query("UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?", [this.nombre, this.descripcion, this.id]);
      return {
        id: this.id,
        nombre: this.nombre,
        descripcion: this.descripcion
      };
    } catch (error) {
      throw new Error("Error al actualizar la categoría");
    }
  }

  async delete(id) {
    try {
      await connection.query("DELETE FROM categorias WHERE id = ?", [id]);
      return {
        id: id
      };
    } catch (error) {
      throw new Error("Error al eliminar la categoría");
    }
  }
};

export default Categoria;