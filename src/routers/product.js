const express = require("express");
const isAdmin = require("../middlewares/isAdmin");
const { getAllProducts, createProduct } = require("../models/product");

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const data = await getAllProducts();
  const saludo = "😃";
  res.send({ data, saludo });
});

// isAdmin  es un middleware local...😎

productRouter.post("/", isAdmin, async (req, res) => {
  const nuevoProducto = req.body;

  const idProductsaved = await createProduct(nuevoProducto);

  res.send({ data: idProductsaved });
});

module.exports = productRouter;
