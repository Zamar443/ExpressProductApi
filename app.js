require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));


// Middleware
app.use(express.json());

// DB connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/express_api")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");


// Test route
app.get("/test", (req, res) => {
  res.json({ message: "API works" });
});

// Server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
