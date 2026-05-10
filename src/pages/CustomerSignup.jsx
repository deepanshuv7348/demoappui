import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Phone, ArrowRight, ShieldCheck, Wrench } from 'lucide-react';

export default function CustomerSignup() {
  const [step, setStep] = useState(1); // 1: form, 2: OTP verification
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [otp, setOtp] = useState('');
  const [receivedOtp, setReceivedOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { sendOTP, signupCustomer } = useAuth();
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await sendOTP(form.phone);
      setReceivedOtp(res.otp);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signupCustomer({ ...form, otp });
      navigate('/customer/dashboard');
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
              <Wrench className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-xl font-extrabold text-navy-800">Customer Sign Up</h1>
            <p className="text-gray-500 text-sm mt-1">Create your account with OTP verification</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-mmt-500 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <div className={`w-12 h-1 rounded ${step >= 2 ? 'bg-mmt-500' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-mmt-500 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
          </div>

          {error && (
            <div className="bg-red-50 text-mmt-600 px-4 py-3 rounded mb-5 text-sm font-semibold">
              {error}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input name="name" value={form.name} onChange={handleChange} className="input-field pl-11" placeholder="Rahul Sharma" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input name="email" type="email" value={form.email} onChange={handleChange} className="input-field pl-11" placeholder="you@example.com" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input name="phone" value={form.phone} onChange={handleChange} className="input-field pl-11" placeholder="9876543210" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input name="password" type="password" value={form.password} onChange={handleChange} className="input-field pl-11" placeholder="Min 6 characters" required minLength={6} />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-mmt w-full flex items-center justify-center gap-2 text-sm">
                {loading ? 'Sending OTP...' : <>SEND OTP <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-5">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 text-green-700 font-medium mb-1">
                  <ShieldCheck className="w-5 h-5" /> OTP Sent!
                </div>
                <p className="text-green-600 text-sm">
                  OTP sent to {form.phone}. For demo, your OTP is: <span className="font-bold text-lg">{receivedOtp}</span>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="input-field text-center text-2xl tracking-widest font-bold"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </div>

              <button type="submit" disabled={loading} className="btn-mmt w-full flex items-center justify-center gap-2 text-sm">
                {loading ? 'Verifying...' : <>VERIFY & SIGN UP <ShieldCheck className="w-4 h-4" /></>}
              </button>

              <button type="button" onClick={() => setStep(1)} className="w-full text-gray-500 hover:text-gray-700 text-sm font-medium">
                ← Go back and edit details
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?{' '}
              <Link to="/customer/login" className="text-mmt-500 font-bold hover:text-mmt-600">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
