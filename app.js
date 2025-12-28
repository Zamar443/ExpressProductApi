const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for products
let products = [];
let currentId = 1;

/*
 Product structure:
 {
   id: number,
   name: string,
   price: number,
   description: string
 }
*/

/**
 * CREATE a new product
 * POST /products
 */
app.post("/products", (req, res) => {
  const { name, price, description } = req.body;

  // Basic validation
  if (!name || price === undefined) {
    return res.status(400).json({
      message: "Product name and price are required",
    });
  }

  const newProduct = {
    id: currentId++,
    name,
    price,
    description: description || "",
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

/**
 * GET all products
 * GET /products
 */
app.get("/products", (req, res) => {
  res.json(products);
});

/**
 * GET a product by ID
 * GET /products/:id
 */
app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(product);
});

/**
 * UPDATE a product
 * PUT /products/:id
 */
app.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price, description } = req.body;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  // Update only provided fields
  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;
  if (description !== undefined) product.description = description;

  res.json(product);
});

/**
 * DELETE a product
 * DELETE /products/:id
 */
app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  const deletedProduct = products.splice(index, 1);
  res.json(deletedProduct[0]);
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
