import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiCheck, FiX } from 'react-icons/fi';
import { GiCircuitry } from 'react-icons/gi';
import { useAuth } from '../context/AuthContext';

const PasswordRule = ({ valid, text }) => (
  <div className={`flex items-center gap-1.5 text-xs ${valid ? 'text-green-400' : 'text-gray-500'}`}>
    {valid ? <FiCheck size={11} /> : <FiX size={11} />}
    {text}
  </div>
);

const Signup = () => {
  const navigate = useNavigate();
  const { register, loading, isAuthenticated } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  const passwordRules = {
    length: form.password.length >= 6,
    match: form.password === form.confirmPassword && form.confirmPassword.length > 0,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim()) { setError('Name is required'); return; }
    if (!passwordRules.length) { setError('Password must be at least 6 characters'); return; }
    if (!passwordRules.match) { setError('Passwords do not match'); return; }

    const result = await register(form.name.trim(), form.email, form.password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <GiCircuitry className="text-3xl text-purple-500" />
            <span className="font-gaming text-2xl font-bold text-gradient-cyber">DOWAR TECH</span>
          </Link>
          <h1 className="font-gaming text-2xl font-bold text-white">Create Account</h1>
          <p className="text-gray-400 mt-1">Join thousands of gamers</p>
        </div>

        <div className="bg-dark-800 border border-gray-700 rounded-2xl p-8">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 mb-5 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Full Name</label>
              <input type="text" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your Name" required className="input-gaming" />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Email Address</label>
              <input type="email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="gamer@dowartech.com" required className="input-gaming" />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Create a password" required className="input-gaming pr-12" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Confirm Password</label>
              <input type="password" value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                placeholder="Confirm your password" required className="input-gaming" />
            </div>

            {/* Password rules */}
            {(form.password || form.confirmPassword) && (
              <div className="bg-dark-700 rounded-lg p-3 space-y-1">
                <PasswordRule valid={passwordRules.length} text="At least 6 characters" />
                <PasswordRule valid={passwordRules.match} text="Passwords match" />
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full btn-primary py-3 text-base font-bold flex items-center justify-center mt-2">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
