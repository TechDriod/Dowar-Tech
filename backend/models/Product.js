const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ['Budget', 'Mid-Range', 'High-End', 'Ultra'],
    },
    gpu: { type: String, required: true },
    cpu: { type: String, required: true },
    ram: { type: String, required: true },
    storage: { type: String, required: true },
    powerSupply: { type: String },
    cooling: { type: String },
    motherboard: { type: String },
    case: { type: String },
    description: { type: String, required: true },
    features: [{ type: String }],
    imageUrl: { type: String, default: 'https://via.placeholder.com/400x300' },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
    stockCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual('discountPercent').get(function () {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

productSchema.index({ name: 'text', description: 'text', gpu: 'text', cpu: 'text' });

module.exports = mongoose.model('Product', productSchema);
