const express = require("express");
const cartRouter = require("./routers/cart");
const productRouter = require("./routers/product");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send({ data: Date.now() }));

app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);

app.listen(8080, () =>
  console.log(`Servidor abierto en http://localhost:${8080}/`)
);
