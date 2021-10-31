const Contenedor = require("../../Contenedor");

const productosContenedor = new Contenedor("./data/products.json");

const getAllProducts = async () => {
  const list = await productosContenedor.getAll();
  console.log(list);
  return list;
};

const createProduct = async (product) => {
  const idProductoGuardado = await productosContenedor.save(product);

  return idProductoGuardado;
};

module.exports = {
  getAllProducts,
  createProduct,
};
