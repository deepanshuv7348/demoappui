import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import mockApi from '../utils/mockApi';
import { Wrench, Calendar, IndianRupee, Plus, ArrowRight, Store } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';
const useMockApi = !API_URL;

export default function VendorDashboard() {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (useMockApi) {
        const token = localStorage.getItem('token');
        const [servicesRes, bookingsRes] = [
          mockApi.getVendorServices(token),
          mockApi.getVendorBookings(token)
        ];
        setServices(servicesRes.data);
        setBookings(bookingsRes.data);
      } else {
        const token = localStorage.getItem('token');
        const [servicesRes, bookingsRes] = await Promise.all([
          axios.get(`${API_URL}/api/services/vendor/mine`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${API_URL}/api/bookings/vendor`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        setServices(servicesRes.data);
        setBookings(bookingsRes.data);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const activeBookings = bookings.filter(b => b.status === 'accepted').length;
  const completedBookings = bookings.filter(b => b.status === 'delivered').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-navy-600 to-navy-700 rounded-lg p-6 md:p-8 text-white mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-2">Welcome, {user?.name}!</h1>
        <p className="text-white/60 text-sm">Manage your services and bookings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card p-4 text-center">
          <div className="w-10 h-10 bg-navy-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Wrench className="w-5 h-5 text-navy-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{services.length}</p>
          <p className="text-sm text-gray-500">My Services</p>
        </div>
        <div className="card p-4 text-center">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Calendar className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{pendingBookings}</p>
          <p className="text-sm text-gray-500">Pending</p>
        </div>
        <div className="card p-4 text-center">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Store className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{activeBookings}</p>
          <p className="text-sm text-gray-500">Active</p>
        </div>
        <div className="card p-4 text-center">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <IndianRupee className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{completedBookings}</p>
          <p className="text-sm text-gray-500">Completed</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link to="/vendor/add-service" className="card p-6 flex items-center justify-between group no-underline hover:border-mmt-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-mmt-50 rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-mmt-500" />
            </div>
            <div>
              <h3 className="font-bold text-navy-800 group-hover:text-mmt-500 transition-colors">Add New Service</h3>
              <p className="text-gray-500 text-sm">List a new service for customers</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-mmt-500 transition-colors" />
        </Link>
        <Link to="/vendor/bookings" className="card p-6 flex items-center justify-between group no-underline hover:border-mmt-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-navy-600" />
            </div>
            <div>
              <h3 className="font-bold text-navy-800 group-hover:text-mmt-500 transition-colors">Manage Bookings</h3>
              <p className="text-gray-500 text-sm">Accept and deliver bookings</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-mmt-500 transition-colors" />
        </Link>
      </div>

      {/* Recent Bookings */}
      <div>
        <h2 className="text-xl font-extrabold text-mmt-500 mb-4">Recent Bookings</h2>
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-mmt-500"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-gray-400 mb-4">No bookings yet. Add services to start receiving bookings!</p>
            <Link to="/vendor/add-service" className="btn-navy inline-block text-sm">Add Service</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.slice(0, 5).map((booking) => (
              <div key={booking._id} className="card p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800">{booking.service?.name || 'Service'}</h4>
                  <p className="text-sm text-gray-500">
                    {booking.customer?.name || 'Customer'} • {new Date(booking.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <span className={`badge-${booking.status}`}>{booking.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
