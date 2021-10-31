const express = require("express");
const {
  createCart,
  deleteCart,
  addProductsToCart,
  getProductsByIdCard,
} = require("../models/cart");

const cartRouter = express.Router();

// cartRouter.get('/', async (req, res) => {
//   const data = await getAllCart();
//   res.send({ data });
// });

cartRouter.post("/", async (req, res) => {
  const cart = req.body;

  const idCartSaved = await createCart(cart);

  res.send({ data: idCartSaved });
});

cartRouter.delete("/:id", async (req, res) => {
  const cart = req.body;

  const idCartDeleted = await deleteCart(cart);

  res.send({ data: idCartDeleted });
});

cartRouter.get("/:id/productos", async (req, res) => {
  const cartId = req.params.id;
  console.log({ cartId });
  const list = await getProductsByIdCard(cartId);
  console.log({ list });

  res.send({ data: list });
});

cartRouter.post("/:id/productos", async (req, res) => {
  const cartId = req.params.id;
  const cartUpdate = req.body;

  const cart = await addProductsToCart(cartId, cartUpdate);

  res.send({ data: cart });
});

cartRouter.delete("/:id/productos/:id_prod", async (req, res) => {
  const cartId = req.params.id;
  const productId = req.params.id_prod;

  const cart = await deleteProductToCart(cartId, productId);

  res.send({ data: cart });
});

module.exports = cartRouter;
