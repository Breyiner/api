import connection from "../utils/db.js";

class Categoria {
  // constructor(nombre, descripcion, id) {
  //   if (id) this.id = id;
  //   this.nombre = nombre;
  //   this.descripcion = descripcion;
  // }

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

  async create(nombre, descripcion) {
    try {
      const [result] = await connection.query("INSERT INTO categorias (nombre, descripcion) VALUES (?,?)", [nombre, descripcion]);
      return { id: result.id, nombre, descripcion };
    } catch (error) {
      throw new Error("Error al guardar categoría");
    }
  }

  async update(nombre, descripcion, id) {
    try {
      const [result] = await connection.query("UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?", [nombre, descripcion, id]);
      
      if (result.affectedRows == 0) throw new Error("Categoría no encontrada");
      return { id, nombre, descripcion };
    } catch (error) {
      throw new Error("Error al actualizar la categoría");
    }
  }

  async partialUpdate(id, campos) {
    try {

      let comando = "";
      for (const propiedad in campos) {
        comando += `${propiedad} = "${campos[propiedad]}", `;
      }

      comando = comando.substring(0, comando.length - 2);

      const [result] = await connection.query(`UPDATE categorias SET ${comando} WHERE id = ?`, [id]);
      
      if (result.affectedRows == 0) throw new Error("Categoría no encontrada");

      return {mensaje: "Categoría actualizada"};

    } catch (error) {
      throw new Error(error);
    }
  }

  async tieneProductosRelacionados( categoria_id ) {
    const [productos] = await connection.query("SELECT * FROM productos WHERE categoria_id = ?", [categoria_id]);

    return productos.length > 0;
  }

  async delete(categoria_id) {
    try {

      const tieneProductos = await this.tieneProductosRelacionados(categoria_id)

      if(tieneProductos) {
        throw new Error("No se puede eliminar esta categoría porque tiene productos asociados.");
      }

      const [result] = await connection.query("DELETE FROM categorias WHERE id = ?", [categoria_id]);
      
      if (result.affectedRows == 0) throw new Error("Categoría no encontrada");

      return {mensaje: "Categoría eliminada"};
      
    } catch (error) {
      throw new Error(error);
    }
  }
};

export default Categoria;