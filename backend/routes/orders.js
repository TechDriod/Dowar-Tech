const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getOrderById } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');
const { validateOrder } = require('../middleware/validation');

router.use(protect);

router.post('/', validateOrder, createOrder);
router.get('/', getMyOrders);
router.get('/:id', getOrderById);

module.exports = router;
