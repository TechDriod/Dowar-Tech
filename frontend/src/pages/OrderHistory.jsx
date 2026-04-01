import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiChevronDown, FiChevronUp, FiShoppingBag } from 'react-icons/fi';
import { getMyOrders } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const STATUS_STYLES = {
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  processing: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  shipped: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  delivered: 'bg-green-500/10 text-green-400 border-green-500/30',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/30',
};

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-dark-800 border border-gray-700 rounded-2xl overflow-hidden hover:border-gray-600 transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/30 rounded-lg flex items-center justify-center">
            <FiPackage className="text-purple-400" size={18} />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">
              Order #{order._id.slice(-8).toUpperCase()}
            </p>
            <p className="text-gray-400 text-xs">
              {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border capitalize ${STATUS_STYLES[order.status]}`}>
            {order.status}
          </span>
          <span className="text-white font-bold">${order.totalPrice.toFixed(2)}</span>
          {expanded ? <FiChevronUp className="text-gray-400" /> : <FiChevronDown className="text-gray-400" />}
        </div>
      </div>

      {/* Order Details */}
      {expanded && (
        <div className="border-t border-gray-700 p-5">
          {/* Items */}
          <div className="space-y-3 mb-4">
            {order.orderItems.map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={item.image || 'https://via.placeholder.com/40x30'}
                    alt={item.name} className="w-10 h-8 object-cover rounded-md"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/40x30'; }} />
                  <div>
                    <p className="text-white text-sm font-medium">{item.name}</p>
                    <p className="text-gray-400 text-xs">Qty: {item.qty}</p>
                  </div>
                </div>
                <span className="text-white text-sm font-semibold">
                  ${(item.price * item.qty).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Totals + Shipping */}
          <div className="bg-dark-700 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white">${order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tax</span>
                <span className="text-white">${order.taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Shipping</span>
                <span className={order.shippingPrice === 0 ? 'text-green-400' : 'text-white'}>
                  {order.shippingPrice === 0 ? 'FREE' : `$${order.shippingPrice.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between font-bold border-t border-gray-600 pt-2">
                <span className="text-white">Total</span>
                <span className="text-white">${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Shipping to:</p>
              <p className="text-white text-xs">
                {order.shippingAddress.fullName}<br />
                {order.shippingAddress.street}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                {order.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders();
        setOrders(res.data.orders);
      } catch {
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <LoadingSpinner size="lg" text="Loading orders..." />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-gaming text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <FiShoppingBag className="text-purple-400" /> Order History
      </h1>

      {error && <p className="text-red-400 mb-6">{error}</p>}

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-7xl mb-4">📦</div>
          <h2 className="font-gaming text-xl font-bold text-white mb-3">No Orders Yet</h2>
          <p className="text-gray-400 mb-6">You haven't placed any orders yet.</p>
          <Link to="/products" className="btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-400 text-sm">{orders.length} order{orders.length !== 1 ? 's' : ''} total</p>
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
