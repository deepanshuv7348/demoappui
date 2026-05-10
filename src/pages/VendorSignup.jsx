import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Phone, ArrowRight, Store } from 'lucide-react';

export default function VendorSignup() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signupVendor } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signupVendor(form);
      navigate('/vendor/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#f4f4f4] py-12 px-4">
      <div className="w-full max-w-md">
        <div className="card p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-navy-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Store className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-xl font-extrabold text-navy-800">Vendor Sign Up</h1>
            <p className="text-gray-500 text-sm mt-1">Start offering your services today</p>
          </div>

          {error && (
            <div className="bg-red-50 text-mmt-600 px-4 py-3 rounded mb-5 text-sm font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name / Business Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input name="name" value={form.name} onChange={handleChange} className="input-field pl-11" placeholder="Amit Services" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input name="email" type="email" value={form.email} onChange={handleChange} className="input-field pl-11" placeholder="vendor@example.com" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input name="phone" value={form.phone} onChange={handleChange} className="input-field pl-11" placeholder="9876543211" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input name="password" type="password" value={form.password} onChange={handleChange} className="input-field pl-11" placeholder="Min 6 characters" required minLength={6} />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-navy w-full flex items-center justify-center gap-2 text-sm">
              {loading ? 'Creating account...' : <>CREATE VENDOR ACCOUNT <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?{' '}
              <Link to="/vendor/login" className="text-mmt-500 font-bold hover:text-mmt-600">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
