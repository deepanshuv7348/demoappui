import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import mockApi from '../utils/mockApi';
import { Calendar, IndianRupee, Wrench, ShoppingBag, ArrowRight } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';
const useMockApi = !API_URL;

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const statusCounts = {
    pending: bookings.filter(b => b.status === 'pending').length,
    accepted: bookings.filter(b => b.status === 'accepted').length,
    delivered: bookings.filter(b => b.status === 'delivered').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-navy-600 to-navy-700 rounded-lg p-6 md:p-8 text-white mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-2">Welcome, {user?.name}!</h1>
        <p className="text-white/60 text-sm">Manage your bookings and discover new services</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card p-4 text-center">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Calendar className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{statusCounts.pending}</p>
          <p className="text-sm text-gray-500">Pending</p>
        </div>
        <div className="card p-4 text-center">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Wrench className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{statusCounts.accepted}</p>
          <p className="text-sm text-gray-500">In Progress</p>
        </div>
        <div className="card p-4 text-center">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <ShoppingBag className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{statusCounts.delivered}</p>
          <p className="text-sm text-gray-500">Delivered</p>
        </div>
        <div className="card p-4 text-center">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <IndianRupee className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{bookings.length}</p>
          <p className="text-sm text-gray-500">Total Bookings</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link to="/services" className="card p-6 flex items-center justify-between group no-underline hover:border-mmt-200">
          <div>
            <h3 className="font-bold text-navy-800 group-hover:text-mmt-500 transition-colors">Browse Services</h3>
            <p className="text-gray-500 text-sm">Find and book professional services</p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-mmt-500 transition-colors" />
        </Link>
        <Link to="/customer/bookings" className="card p-6 flex items-center justify-between group no-underline hover:border-mmt-200">
          <div>
            <h3 className="font-bold text-navy-800 group-hover:text-mmt-500 transition-colors">My Bookings</h3>
            <p className="text-gray-500 text-sm">View and manage your bookings</p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-mmt-500 transition-colors" />
        </Link>
      </div>

      {/* Recent Bookings */}
      <div>
        <h2 className="text-xl font-extrabold text-navy-800 mb-4">Recent Bookings</h2>
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-mmt-500"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-gray-400 mb-4">No bookings yet</p>
            <Link to="/services" className="btn-mmt inline-block text-sm">Browse Services</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.slice(0, 5).map((booking) => (
              <div key={booking._id} className="card p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800">{booking.service?.name || 'Service'}</h4>
                  <p className="text-sm text-gray-500">
                    {new Date(booking.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • {booking.vendor?.name || 'Vendor'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-mmt-600">₹{booking.service?.price || 0}</span>
                  <span className={`badge-${booking.status}`}>{booking.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
