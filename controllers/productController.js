const Product = require("../models/products");

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const imageUrl = req.file ? req.file.path : null;

    const product = await Product.create({
      name,
      price,
      description,
      imageUrl,
    });

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};
