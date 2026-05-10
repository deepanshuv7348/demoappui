import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import mockApi from '../utils/mockApi';
import { Calendar, MapPin, FileText, ArrowLeft, CheckCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';
const useMockApi = !API_URL;

export default function BookService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [form, setForm] = useState({ bookingDate: '', address: '', notes: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      if (useMockApi) {
        const res = mockApi.getService(id);
        setService(res.data);
      } else {
        const res = await axios.get(`${API_URL}/api/services/${id}`);
        setService(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch service:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (useMockApi) {
        const token = localStorage.getItem('token');
        mockApi.createBooking({ serviceId: id, bookingDate: form.bookingDate, address: form.address, notes: form.notes }, token);
      } else {
        const token = localStorage.getItem('token');
        await axios.post(`${API_URL}/api/bookings`, {
          serviceId: id,
          bookingDate: form.bookingDate,
          address: form.address,
          notes: form.notes
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setSuccess(true);
      setTimeout(() => navigate('/customer/bookings'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mmt-500"></div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-500">Redirecting to your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-gray-500 hover:text-mmt-500 font-medium mb-6 no-underline">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <h1 className="text-2xl font-extrabold text-navy-800 mb-2">Book Service</h1>

      {service && (
        <div className="card p-4 mb-6 bg-navy-50 border-navy-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-navy-800">{service.name}</h3>
              <p className="text-sm text-gray-500">{service.location} • by {service.vendor?.name}</p>
            </div>
            <div className="text-xl font-bold text-mmt-600">₹{service.price}</div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm font-medium">
          {error}
        </div>
      )}

      <div className="card p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Booking Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={form.bookingDate}
                onChange={(e) => setForm({ ...form, bookingDate: e.target.value })}
                className="input-field pl-11"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="input-field pl-11"
                placeholder="Enter your complete address"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Special Notes (Optional)</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="input-field pl-11 min-h-[100px]"
                placeholder="Any special instructions for the service provider..."
              />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Service Price:</span>
              <span className="text-2xl font-extrabold text-mmt-600">₹{service?.price || 0}</span>
            </div>
            <button type="submit" disabled={submitting} className="btn-mmt w-full flex items-center justify-center gap-2 text-sm">
              {submitting ? 'Booking...' : <>CONFIRM BOOKING <Calendar className="w-4 h-4" /></>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
