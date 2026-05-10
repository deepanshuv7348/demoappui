import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, Store, Wrench } from 'lucide-react';

export default function VendorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password, 'vendor');
      navigate('/vendor/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#f4f4f4] py-12 px-4">
      <div className="w-full max-w-md">
        <div className="card p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-navy-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Store className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-xl font-extrabold text-navy-800">Vendor Login</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your services and bookings</p>
          </div>

          {error && (
            <div className="bg-red-50 text-mmt-600 px-4 py-3 rounded mb-5 text-sm font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field pl-11" placeholder="vendor@example.com" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field pl-11" placeholder="Enter your password" required />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-navy w-full flex items-center justify-center gap-2 text-sm">
              {loading ? 'Signing in...' : <>LOGIN <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account?{' '}
              <Link to="/vendor/signup" className="text-mmt-500 font-bold hover:text-mmt-600">Sign Up</Link>
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">Demo: vendor@demo.com / vendor123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
