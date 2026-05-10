import { useEffect, useState } from 'react';
import axios from 'axios';
import mockApi from '../utils/mockApi';
import { Calendar, MapPin, X, IndianRupee } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';
const useMockApi = !API_URL;

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      if (useMockApi) {
        const token = localStorage.getItem('token');
        const res = mockApi.getCustomerBookings(token);
        setBookings(res.data);
      } else {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/api/bookings/customer`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      if (useMockApi) {
        mockApi.cancelBooking(bookingId, localStorage.getItem('token'));
        fetchBookings();
      } else {
        const token = localStorage.getItem('token');
        await axios.put(`${API_URL}/api/bookings/${bookingId}/cancel`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchBookings();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const filteredBookings = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-extrabold text-navy-800 mb-2">My Bookings</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'pending', 'accepted', 'delivered', 'cancelled'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${filter === f ? 'bg-mmt-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {f === 'all' ? 'All' : f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mmt-500"></div>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-gray-400">No bookings found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking._id} className="card p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-navy-800 text-lg">{booking.service?.name || 'Service'}</h3>
                    <span className={`badge-${booking.status}`}>{booking.status}</span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(booking.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> {booking.address}
                    </div>
                    <p>Vendor: {booking.vendor?.name || 'N/A'}</p>
                    {booking.notes && <p className="italic">"{booking.notes}"</p>}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xl font-bold text-mmt-600">
                      ₹{booking.service?.price || 0}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Booked on {new Date(booking.createdAt).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  {(booking.status === 'pending' || booking.status === 'accepted') && (
                    <button onClick={() => handleCancel(booking._id)} className="text-red-500 hover:text-red-700 text-xs font-bold transition-colors">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
