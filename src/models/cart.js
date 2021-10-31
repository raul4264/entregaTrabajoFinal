const Contenedor = require("../../Contenedor");

const cartContenedor = new Contenedor("./data/carts.json");

const createCart = async (cart) => {
  const idCartSaved = await cartContenedor.save(cart);
  return idCartSaved;
};

const deleteCart = async (idCart) => {
  await cartContenedor.deleteById(idCart);
  return idCart;
};

const getProductsByIdCard = async (id) => {
  const cart = await cartContenedor.getById(id);
  const { products } = cart;

  // Si guardamos solos los id de products en el carrito, aca es el lugar para obtener los product con su id...😎

  return products;
};

const addProductsToCart = async (id, update) => {
  const cartUpdated = await cartContenedor.update(id, update);
  return cartUpdated;
};

const deleteProductToCart = async (id, idProduct) => {
  const cart = await cartContenedor.getById(id);
  const { products } = cart;

  products.splice(idProduct, 1);

  const newCart = {
    ...cart,
    products,
  };
  const cartUpdated = await cartContenedor.update(id, newCart);
  return cartUpdated;
};

module.exports = {
  createCart,
  deleteCart,
  getProductsByIdCard,
  addProductsToCart,
  deleteProductToCart,
};
