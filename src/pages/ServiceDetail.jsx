import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import mockApi from '../utils/mockApi';
import { useAuth } from '../context/AuthContext';
import { Star, MapPin, IndianRupee, User, Phone, Calendar, ArrowLeft, Shield, Clock } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';
const useMockApi = !API_URL;

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

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

  const handleBook = () => {
    if (!isAuthenticated) {
      navigate('/customer/login');
      return;
    }
    if (user?.role !== 'customer') {
      navigate('/customer/login');
      return;
    }
    navigate(`/book/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mmt-500"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">Service not found</p>
        <Link to="/services" className="text-mmt-500 font-bold mt-2 inline-block no-underline">← Back to services</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/services" className="inline-flex items-center gap-1 text-gray-500 hover:text-mmt-500 font-medium mb-6 no-underline">
        <ArrowLeft className="w-4 h-4" /> Back to Services
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="h-56 bg-navy-50 rounded-lg flex items-center justify-center mb-6">
              <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                <Shield className="w-12 h-12 text-navy-600" />
              </div>
            </div>

            <h1 className="text-2xl font-extrabold text-navy-800 mb-2">{service.name}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-1 text-gold-500">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-bold">{service.rating}</span>
              </div>
              <span className="text-3xl font-extrabold text-mmt-600">₹{service.price}</span>
              <span className="text-gray-400 text-sm">({service.reviews} reviews)</span>
              <div className="flex items-center gap-1 text-gray-500">
                <MapPin className="w-4 h-4" /> {service.location}
              </div>
            </div>

            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-navy-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-navy-700 mb-1">
                  <Shield className="w-4 h-4" /> Quality
                </div>
                <p className="text-sm text-navy-600">Verified Professional</p>
              </div>
              <div className="bg-mmt-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-mmt-700 mb-1">
                  <Clock className="w-4 h-4" /> On Time
                </div>
                <p className="text-sm text-mmt-600">Guaranteed Service</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="card p-6 sticky top-24">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center text-3xl font-bold text-mmt-600">
                <IndianRupee className="w-6 h-6" /> {service.price}
              </div>
              <p className="text-gray-400 text-sm">per service</p>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-4">
              <h4 className="font-semibold text-gray-800 mb-3">Service Provider</h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-navy-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{service.vendor?.name || 'Vendor'}</p>
                  <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <Phone className="w-3.5 h-3.5" /> {service.vendor?.phone || 'N/A'}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleBook}
              className="btn-mmt w-full text-sm"
            >
              <Calendar className="w-5 h-5" /> Book Now
            </button>

            {!isAuthenticated && (
              <p className="text-center text-xs text-gray-400 mt-2">Login as customer to book</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
