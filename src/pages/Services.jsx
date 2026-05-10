import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import mockApi from '../utils/mockApi';
import { Search, Star, MapPin, IndianRupee, Filter, Home, Droplets, Zap, Paintbrush, Bug, Wind, Hammer, Truck } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';
const useMockApi = !API_URL;

const categoryMap = {
  'home-cleaning': { label: 'Home Cleaning', icon: Home },
  'plumbing': { label: 'Plumbing', icon: Droplets },
  'electrical': { label: 'Electrical', icon: Zap },
  'painting': { label: 'Painting', icon: Paintbrush },
  'pest-control': { label: 'Pest Control', icon: Bug },
  'ac-service': { label: 'AC Service', icon: Wind },
  'carpentry': { label: 'Carpentry', icon: Hammer },
  'moving-packing': { label: 'Moving & Packing', icon: Truck },
};

export default function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [location, setLocation] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    fetchServices();
  }, [category, searchParams]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const params = {};
      if (category) params.category = category;
      if (searchParams.get('search')) params.search = searchParams.get('search');
      if (searchParams.get('location')) params.location = searchParams.get('location');
      if (useMockApi) {
        const res = mockApi.getServices(params);
        setServices(res.data);
      } else {
        const res = await axios.get(`${API_URL}/api/services`, { params });
        setServices(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch services:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    if (location) params.location = location;
    setSearchParams(params);
  };

  const handleCategoryClick = (cat) => {
    setCategory(cat === category ? '' : cat);
    const params = {};
    if (search) params.search = search;
    if (cat !== category) params.category = cat;
    if (location) params.location = location;
    setSearchParams(params);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-navy-800">All Services</h1>
        <p className="text-gray-500">Find and book professional services near you</p>
      </div>

      {/* Search & Filter */}
      <form onSubmit={handleSearch} className="card p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-11"
              placeholder="Search services..."
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input-field pl-11 w-full md:w-48"
              placeholder="Location"
            />
          </div>
          <button type="submit" className="btn-mmt flex items-center justify-center gap-2 text-sm">
            <Search className="w-4 h-4" /> Search
          </button>
          <button onClick={() => setFilterOpen(!filterOpen)} className="flex items-center gap-2 text-navy-700 hover:text-mmt-500 font-semibold text-sm transition-colors">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
      </form>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => handleCategoryClick('')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${!category ? 'bg-mmt-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          All
        </button>
        {Object.entries(categoryMap).map(([key, val]) => (
          <button
            key={key}
            onClick={() => handleCategoryClick(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === key ? 'bg-mmt-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {val.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mmt-500"></div>
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No services found. Try a different search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link key={service._id} to={`/services/${service._id}`} className="card overflow-hidden group no-underline hover:border-mmt-100">
              <div className="h-40 bg-navy-50 flex items-center justify-center group-hover:bg-mmt-50 transition-colors">
                {categoryMap[service.category] ? (
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center">
                    {(() => { const Icon = categoryMap[service.category].icon; return <Icon className="w-8 h-8 text-navy-600" />; })()}
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center">
                    <Home className="w-8 h-8 text-navy-600" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-navy-800 group-hover:text-mmt-500 transition-colors">{service.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-gold-600 font-semibold">
                    <Star className="w-3 h-3 fill-gold-400 text-gold-400" /> {service.rating}
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">{service.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-mmt-600 font-bold">
                    <IndianRupee className="w-4 h-4" /> <span className="text-mmt-600 font-extrabold text-lg">{service.price}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <MapPin className="w-3 h-3" /> {service.location}
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  by {service.vendor?.name || 'Vendor'} • {service.reviews} reviews
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
