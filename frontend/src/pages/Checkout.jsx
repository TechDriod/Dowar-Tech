import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiPackage, FiTruck, FiCreditCard } from 'react-icons/fi';
import { createOrder } from '../services/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const STEPS = [
  { id: 1, label: 'Shipping', icon: FiTruck },
  { id: 2, label: 'Delivery', icon: FiPackage },
  { id: 3, label: 'Review', icon: FiCheck },
];

const SHIPPING_METHODS = [
  { id: 'standard', label: 'Standard Shipping', time: '5-7 business days', price: 9.99 },
  { id: 'express', label: 'Express Shipping', time: '2-3 business days', price: 19.99 },
  { id: 'free', label: 'Free Shipping', time: '7-10 business days', price: 0, minOrder: 1000 },
];

const InputField = ({ label, name, value, onChange, required, type = 'text', placeholder }) => (
  <div>
    <label className="block text-sm text-gray-400 mb-1">{label}{required && ' *'}</label>
    <input type={type} name={name} value={value} onChange={onChange} required={required} placeholder={placeholder}
      className="input-gaming" />
  </div>
);

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const [shipping, setShipping] = useState({
    fullName: '', street: '', city: '', state: '', zipCode: '', country: 'United States',
  });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod] = useState('Credit Card');

  const TAX_RATE = 0.08;
  const subtotal = cartTotal;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const selectedMethod = SHIPPING_METHODS.find((m) => m.id === shippingMethod);
  const shippingCost = subtotal >= 1000 ? 0 : selectedMethod?.price || 9.99;
  const total = subtotal + tax + shippingCost;

  const handleShippingChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const validateShipping = () => {
    const required = ['fullName', 'street', 'city', 'state', 'zipCode', 'country'];
    return required.every((field) => shipping[field].trim());
  };

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    try {
      const orderItems = cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        qty: item.qty,
        price: item.price,
        image: item.imageUrl,
      }));

      const res = await createOrder({
        orderItems,
        shippingAddress: shipping,
        paymentMethod,
        shippingPrice: shippingCost,
      });

      setOrderId(res.data.order._id);
      clearCart();
      setStep(4);
      toast.success('Order placed successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };

  // Order success screen
  if (step === 4) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-dark-800 border border-green-500/30 rounded-2xl p-10">
          <div className="w-20 h-20 bg-green-500/10 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck size={36} className="text-green-400" />
          </div>
          <h2 className="font-gaming text-3xl font-bold text-white mb-3">Order Placed!</h2>
          <p className="text-gray-400 mb-2">Your order has been successfully placed.</p>
          {orderId && (
            <p className="text-sm text-gray-500 mb-6">Order ID: <span className="text-purple-400 font-mono">{orderId}</span></p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate('/orders')} className="btn-primary">View My Orders</button>
            <button onClick={() => navigate('/products')} className="btn-secondary">Continue Shopping</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-gaming text-3xl font-bold text-white mb-8">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center mb-8">
        {STEPS.map((s, idx) => (
          <React.Fragment key={s.id}>
            <div className="flex items-center gap-2">
              <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all
                ${step >= s.id ? 'bg-purple-600 border-purple-600 text-white' : 'border-gray-600 text-gray-500'}`}>
                {step > s.id ? <FiCheck size={16} /> : <s.icon size={16} />}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${step >= s.id ? 'text-white' : 'text-gray-500'}`}>
                {s.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`flex-grow h-0.5 mx-3 ${step > s.id ? 'bg-purple-600' : 'bg-gray-700'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Step 1: Shipping Address */}
          {step === 1 && (
            <div className="bg-dark-800 border border-gray-700 rounded-2xl p-6">
              <h2 className="font-gaming text-lg font-bold text-white mb-5 flex items-center gap-2">
                <FiTruck className="text-purple-400" /> Shipping Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <InputField label="Full Name" name="fullName" value={shipping.fullName} onChange={handleShippingChange} required />
                </div>
                <div className="sm:col-span-2">
                  <InputField label="Street Address" name="street" value={shipping.street} onChange={handleShippingChange} required placeholder="123 Gaming Street" />
                </div>
                <InputField label="City" name="city" value={shipping.city} onChange={handleShippingChange} required />
                <InputField label="State / Province" name="state" value={shipping.state} onChange={handleShippingChange} required />
                <InputField label="ZIP / Postal Code" name="zipCode" value={shipping.zipCode} onChange={handleShippingChange} required />
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Country *</label>
                  <select name="country" value={shipping.country} onChange={handleShippingChange}
                    className="input-gaming">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                    <option>Germany</option>
                    <option>France</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => validateShipping() ? setStep(2) : toast.error('Please fill all required fields')}
                className="btn-primary mt-6 flex items-center gap-2"
              >
                Continue to Delivery
              </button>
            </div>
          )}

          {/* Step 2: Shipping Method */}
          {step === 2 && (
            <div className="bg-dark-800 border border-gray-700 rounded-2xl p-6">
              <h2 className="font-gaming text-lg font-bold text-white mb-5 flex items-center gap-2">
                <FiPackage className="text-purple-400" /> Delivery Method
              </h2>
              <div className="space-y-3 mb-6">
                {SHIPPING_METHODS.map((method) => {
                  const disabled = method.id === 'free' && subtotal < method.minOrder;
                  return (
                    <label key={method.id}
                      className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all
                        ${disabled ? 'opacity-40 cursor-not-allowed border-gray-700' :
                          shippingMethod === method.id ? 'border-purple-500 bg-purple-500/10' : 'border-gray-700 hover:border-gray-600'}`}>
                      <input type="radio" name="shipping" value={method.id}
                        checked={shippingMethod === method.id}
                        onChange={() => !disabled && setShippingMethod(method.id)}
                        disabled={disabled} className="text-purple-600" />
                      <div className="flex-grow">
                        <div className="font-medium text-white text-sm">{method.label}</div>
                        <div className="text-xs text-gray-400">{method.time}</div>
                        {disabled && <div className="text-xs text-gray-500">Available on orders over $1,000</div>}
                      </div>
                      <span className={`font-bold text-sm ${method.price === 0 ? 'text-green-400' : 'text-white'}`}>
                        {method.price === 0 ? 'FREE' : `$${method.price.toFixed(2)}`}
                      </span>
                    </label>
                  );
                })}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-secondary">Back</button>
                <button onClick={() => setStep(3)} className="btn-primary flex items-center gap-2">
                  Review Order
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="bg-dark-800 border border-gray-700 rounded-2xl p-6">
              <h2 className="font-gaming text-lg font-bold text-white mb-5 flex items-center gap-2">
                <FiCreditCard className="text-purple-400" /> Review Order
              </h2>

              <div className="space-y-3 mb-5">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex justify-between items-center py-2 border-b border-gray-700">
                    <div>
                      <p className="text-white text-sm font-medium">{item.name}</p>
                      <p className="text-gray-400 text-xs">Qty: {item.qty}</p>
                    </div>
                    <span className="text-white font-semibold">${(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="bg-dark-700 rounded-xl p-4 mb-5 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Ship to:</span>
                  <span className="text-white text-right text-xs">
                    {shipping.fullName}<br />{shipping.street}, {shipping.city}, {shipping.state} {shipping.zipCode}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Method:</span>
                  <span className="text-white">{selectedMethod?.label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Payment:</span>
                  <span className="text-white">{paymentMethod}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="btn-secondary">Back</button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={submitting}
                  className="btn-primary flex items-center gap-2 flex-grow justify-center"
                >
                  {submitting ? 'Placing Order...' : `Place Order · $${total.toFixed(2)}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div>
          <div className="bg-dark-800 border border-gray-700 rounded-2xl p-5 sticky top-24">
            <h3 className="font-gaming text-sm text-white mb-4 uppercase tracking-wider">Summary</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tax (8%)</span>
                <span className="text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Shipping</span>
                <span className={shippingCost === 0 ? 'text-green-400' : 'text-white'}>
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-gray-700 pt-2 flex justify-between font-bold">
                <span className="text-white">Total</span>
                <span className="text-white">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
