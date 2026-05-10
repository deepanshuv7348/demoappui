import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import mockApi from '../utils/mockApi';
import { Wrench, IndianRupee, MapPin, FileText, ArrowLeft, CheckCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';
const useMockApi = !API_URL;

const categories = [
  { value: 'home-cleaning', label: 'Home Cleaning' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'painting', label: 'Painting' },
  { value: 'pest-control', label: 'Pest Control' },
  { value: 'ac-service', label: 'AC Service' },
  { value: 'carpentry', label: 'Carpentry' },
  { value: 'moving-packing', label: 'Moving & Packing' },
];

export default function AddService() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', description: '', category: '', price: '', location: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (useMockApi) {
        const token = localStorage.getItem('token');
        mockApi.createService({ ...form, price: Number(form.price) }, token);
      } else {
        const token = localStorage.getItem('token');
        await axios.post(`${API_URL}/api/services`, {
          ...form,
          price: Number(form.price)
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      navigate('/vendor/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-gray-500 hover:text-mmt-500 font-medium mb-6 no-underline">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="card p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center">
            <Wrench className="w-6 h-6 text-navy-600" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-navy-800 mb-2">Add New Service</h1>
            <p className="text-gray-500 text-sm">List a service for customers to book</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
            <div className="relative">
              <Wrench className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input name="name" value={form.name} onChange={handleChange} className="input-field pl-11" placeholder="e.g., Deep Home Cleaning" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <textarea name="description" value={form.description} onChange={handleChange} className="input-field pl-11 min-h-[100px]" placeholder="Describe your service in detail..." required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="input-field" required>
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input name="price" type="number" value={form.price} onChange={handleChange} className="input-field pl-11" placeholder="999" min="0" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input name="location" value={form.location} onChange={handleChange} className="input-field pl-11" placeholder="Mumbai" required />
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-navy w-full flex items-center justify-center gap-2 text-sm">
            {loading ? 'Creating...' : <>ADD SERVICE <Plus className="w-4 h-4" /></>}
          </button>
        </form>
      </div>
    </div>
  );
}
