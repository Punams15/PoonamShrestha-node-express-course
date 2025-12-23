console.log("Express Tutorial");

const express = require("express");
const { products } = require("./data");
const peopleRouter = require("./routes/people");

const app = express();

/* -------------------- MIDDLEWARE -------------------- */

// Logger middleware
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().toLocaleString();
  console.log(method, url, time);
  next();
};

app.use(logger);

// Body parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files
app.use(express.static("methods-public"));

// Mount people router **after body parsing**
app.use("/api/v1/people", peopleRouter);

/* -------------------- ROUTES -------------------- */

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
  const product = products.find((p) => p.id == req.params.id);

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
    result = result.filter((p) => p.name.toLowerCase().startsWith(s));
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

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));





/*const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().toLocaleString(); // includes date, time, and year
  console.log(method, url, time);
 
 
  next(); 
  };*/


  /*const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date().toLocaleTimeString()}`);
  next();
};

/* Other middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("methods-public"));

These are all correct and in the right order:

Parse POST form data → urlencoded

Parse JSON → json

Serve frontend files → methods-public */
