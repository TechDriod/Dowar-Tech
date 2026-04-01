const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const products = require('./products');

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dowar-tech');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Products seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
