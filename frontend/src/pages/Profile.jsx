import React, { useState, useEffect } from 'react';
import { FiSave, FiUser, FiMail, FiMapPin } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { updateUserProfile } from '../services/api';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '',
    street: '', city: '', state: '', zipCode: '', country: '',
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        street: user.address?.street || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        zipCode: user.address?.zipCode || '',
        country: user.address?.country || '',
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateUserProfile({
        name: form.name,
        email: form.email,
        address: {
          street: form.street,
          city: form.city,
          state: form.state,
          zipCode: form.zipCode,
          country: form.country,
        },
      });
      updateUser(res.data.user);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, name, value, type = 'text', placeholder }) => (
    <div>
      <label className="block text-sm text-gray-400 mb-1.5">{label}</label>
      <input type={type} value={value}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        placeholder={placeholder} className="input-gaming" />
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="font-gaming text-3xl font-bold text-white mb-8">My Profile</h1>

      {/* Avatar */}
      <div className="flex items-center gap-4 bg-dark-800 border border-gray-700 rounded-2xl p-6 mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-2xl font-bold text-white">
          {user?.name?.[0]?.toUpperCase()}
        </div>
        <div>
          <h2 className="font-bold text-white text-lg">{user?.name}</h2>
          <p className="text-gray-400 text-sm">{user?.email}</p>
          <p className="text-gray-500 text-xs mt-1">
            Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'recently'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Personal Info */}
        <div className="bg-dark-800 border border-gray-700 rounded-2xl p-6 mb-6">
          <h2 className="font-gaming text-lg font-bold text-white mb-5 flex items-center gap-2">
            <FiUser className="text-purple-400" /> Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Full Name" name="name" value={form.name} placeholder="Your full name" />
            <InputField label="Email Address" name="email" value={form.email} type="email" placeholder="your@email.com" />
          </div>
        </div>

        {/* Address */}
        <div className="bg-dark-800 border border-gray-700 rounded-2xl p-6 mb-6">
          <h2 className="font-gaming text-lg font-bold text-white mb-5 flex items-center gap-2">
            <FiMapPin className="text-cyan-400" /> Shipping Address
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <InputField label="Street Address" name="street" value={form.street} placeholder="123 Gaming Street" />
            </div>
            <InputField label="City" name="city" value={form.city} placeholder="Your city" />
            <InputField label="State / Province" name="state" value={form.state} placeholder="Your state" />
            <InputField label="ZIP / Postal Code" name="zipCode" value={form.zipCode} placeholder="ZIP code" />
            <InputField label="Country" name="country" value={form.country} placeholder="Your country" />
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="btn-primary flex items-center gap-2 py-3 px-6">
          <FiSave size={16} />
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
