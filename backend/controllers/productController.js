const Product = require('../models/Product');

// @desc    Get all products with filters
// @route   GET /api/products
const getProducts = async (req, res, next) => {
  try {
    const {
      search, category, gpu, cpu, ram,
      minPrice, maxPrice, sort, page = 1, limit = 12,
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { gpu: { $regex: search, $options: 'i' } },
        { cpu: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) query.category = { $in: category.split(',') };
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (gpu) query.gpu = { $in: gpu.split(',').map((g) => new RegExp(escapeRegex(g.trim()), 'i')) };
    if (cpu) query.cpu = { $in: cpu.split(',').map((c) => new RegExp(escapeRegex(c.trim()), 'i')) };
    if (ram) query.ram = { $in: ram.split(',').map((r) => new RegExp(escapeRegex(r.trim()), 'i')) };

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortObj = {};
    switch (sort) {
      case 'price_asc': sortObj = { price: 1 }; break;
      case 'price_desc': sortObj = { price: -1 }; break;
      case 'rating': sortObj = { rating: -1 }; break;
      case 'newest': sortObj = { createdAt: -1 }; break;
      default: sortObj = { createdAt: -1 };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(query);
    const products = await Product.find(query).sort(sortObj).skip(skip).limit(Number(limit));

    res.json({
      success: true,
      products,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        limit: Number(limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, getProductById };
