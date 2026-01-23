exports.createProduct = async (req, res) => {
  try {
    let { name, price, description } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Name and price are required",
      });
    }

    // 🔧 Remove commas and convert to number
    price = Number(price.replace(/,/g, ""));

    if (isNaN(price)) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid number",
      });
    }

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
