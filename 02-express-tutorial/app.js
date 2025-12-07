console.log('Express Tutorial')

const express = require("express");
const { products } = require("./data");

const app = express();

// Serve public folder
app.use(express.static("public"));

// Test route
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

// All products
app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

// Product by ID
app.get("/api/v1/products/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);

  if (!product) {
    return res.status(404).json({ message: "That product was not found." });
  }

  res.json(product);
});

// Query search
app.get("/api/v1/query", (req, res) => {
  let result = products;

  if (req.query.search) {
    const s = req.query.search.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().startsWith(s));
  }

  if (req.query.limit) {
    result = result.slice(0, Number(req.query.limit));
  }

  if (result.length === 0) {
    return res.status(404).json({ message: "No products match your criteria." });
  }

  res.json(result);
});

// 404 handler
app.all("*", (req, res) => {
  res.status(404).send("404 - Page Not Found");
});

// Listen
app.listen(3000, () => console.log("Server running on port 3000"));

