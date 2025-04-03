export const validarCategoria = (req, res, next) => {
  const { nombre, descripcion } = req.body;

  if (!nombre || nombre.trim() === "") return res.status(400).json({ mensaje: "El nombre en la categoría es obligatorio" });
  if (!descripcion || descripcion.trim() === "") return res.status(400).json({ mensaje: "La descripción en la categoría es obligatorio" });

  next();
}