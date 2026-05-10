import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, Wrench } from 'lucide-react';

export default function CustomerLogin() {
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
      await login(email, password, 'customer');
      navigate('/customer/dashboard');
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
              <Wrench className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-xl font-extrabold text-navy-800">Customer Login</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome back! Sign in to continue</p>
          </div>

          {error && (
            <div className="bg-red-50 text-mmt-600 px-4 py-3 rounded mb-5 text-sm font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-navy-700 mb-1 uppercase tracking-wider">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field pl-10" placeholder="you@example.com" required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-navy-700 mb-1 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field pl-10" placeholder="Enter your password" required />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-mmt w-full flex items-center justify-center gap-2 text-sm">
              {loading ? 'Signing in...' : <>LOGIN <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account?{' '}
              <Link to="/customer/signup" className="text-mmt-500 font-bold hover:text-mmt-600">Sign Up with OTP</Link>
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">Demo: customer@demo.com / customer123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
