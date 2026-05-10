import { Link } from 'react-router-dom';
import { Search, Star, Shield, Clock, Users, ArrowRight, Percent, Home as HomeIcon, Droplets, Zap, Paintbrush, Bug, Wind, Hammer, Truck, BadgeCheck, Headphones, Wallet } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 'home-cleaning', name: 'Home\nCleaning', icon: HomeIcon, bg: 'bg-blue-50', iconColor: 'text-blue-600', border: 'border-blue-200' },
  { id: 'plumbing', name: 'Plumbing', icon: Droplets, bg: 'bg-cyan-50', iconColor: 'text-cyan-600', border: 'border-cyan-200' },
  { id: 'electrical', name: 'Electrical', icon: Zap, bg: 'bg-yellow-50', iconColor: 'text-yellow-600', border: 'border-yellow-200' },
  { id: 'painting', name: 'Painting', icon: Paintbrush, bg: 'bg-pink-50', iconColor: 'text-pink-600', border: 'border-pink-200' },
  { id: 'pest-control', name: 'Pest\nControl', icon: Bug, bg: 'bg-green-50', iconColor: 'text-green-600', border: 'border-green-200' },
  { id: 'ac-service', name: 'AC Service', icon: Wind, bg: 'bg-indigo-50', iconColor: 'text-indigo-600', border: 'border-indigo-200' },
  { id: 'carpentry', name: 'Carpentry', icon: Hammer, bg: 'bg-orange-50', iconColor: 'text-orange-600', border: 'border-orange-200' },
  { id: 'moving-packing', name: 'Moving &\nPacking', icon: Truck, bg: 'bg-red-50', iconColor: 'text-red-600', border: 'border-red-200' },
];

const deals = [
  { title: 'Flat 30% OFF', subtitle: 'On Home Cleaning', code: 'CLEAN30', bg: 'from-mmt-500 to-mmt-600' },
  { title: '₹200 Cashback', subtitle: 'AC Service & Repair', code: 'AC200', bg: 'from-navy-500 to-navy-600' },
  { title: '20% OFF', subtitle: 'Pest Control', code: 'PEST20', bg: 'from-gold-500 to-gold-600' },
];

const trustBadges = [
  { icon: BadgeCheck, title: 'Verified Experts', desc: 'Background-checked professionals' },
  { icon: Shield, title: 'Service Warranty', desc: '30-day guarantee on all services' },
  { icon: Wallet, title: 'Secure Payment', desc: '100% safe & secure transactions' },
  { icon: Headphones, title: '24/7 Support', desc: 'Round-the-clock assistance' },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/services?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div>
      {/* Hero Section - MMT Style */}
      <section className="mmt-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 md:pt-14 md:pb-28 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 leading-tight tracking-tight">
              Home Services, Made Easy
            </h1>
            <p className="text-sm md:text-base text-white/70 mb-8 max-w-xl mx-auto">
              Trusted professionals for cleaning, repairs, maintenance & more. Book in 60 seconds.
            </p>

            {/* Search Bar - MMT Style */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-search flex overflow-hidden">
                <div className="flex-1 flex items-center px-4">
                  <Search className="w-5 h-5 text-navy-400 mr-3 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search for services... e.g. AC Repair, Plumbing"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-3.5 text-navy-800 outline-none text-sm placeholder:text-gray-400"
                  />
                </div>
                <button type="submit" className="bg-mmt-500 hover:bg-mmt-600 text-white px-8 font-bold text-sm transition-colors shrink-0">
                  SEARCH
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L60 68C120 56 240 32 360 24C480 16 600 24 720 28C840 32 960 40 1080 44C1200 48 1320 48 1380 48L1440 48V80H0Z" fill="#f4f4f4"/>
          </svg>
        </div>
      </section>

      {/* Category Circles - MMT Style */}
      <section className="py-10 bg-[#f4f4f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/services?category=${cat.id}`}
                className="flex flex-col items-center gap-2 group no-underline"
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 ${cat.bg} ${cat.border} border-2 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <cat.icon className={`w-7 h-7 md:w-8 md:h-8 ${cat.iconColor}`} />
                </div>
                <span className="text-[11px] md:text-xs font-semibold text-navy-700 text-center leading-tight whitespace-pre-line group-hover:text-mmt-500 transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Deals Section - MMT Style */}
      <section className="py-8 bg-[#f4f4f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl md:text-2xl font-extrabold text-navy-800">Deals & Offers</h2>
            <Link to="/services" className="text-mmt-500 hover:text-mmt-600 text-xs font-bold uppercase tracking-wider no-underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {deals.map((deal, i) => (
              <div key={i} className={`bg-gradient-to-r ${deal.bg} rounded-lg p-5 text-white relative overflow-hidden`}>
                <div className="absolute top-2 right-3">
                  <Percent className="w-10 h-10 text-white/20" />
                </div>
                <p className="text-2xl font-extrabold">{deal.title}</p>
                <p className="text-sm text-white/80 mb-3">{deal.subtitle}</p>
                <div className="flex items-center gap-2">
                  <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded">{deal.code}</span>
                  <Link to="/services" className="text-white text-xs font-semibold hover:underline no-underline">Book Now →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 bg-navy-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-mmt-50 transition-colors">
                  <badge.icon className="w-6 h-6 text-navy-500 group-hover:text-mmt-500 transition-colors" />
                </div>
                <h3 className="font-bold text-navy-800 text-sm mb-1">{badge.title}</h3>
                <p className="text-gray-500 text-xs">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Services - MMT Style */}
      <section className="py-8 bg-[#f4f4f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl md:text-2xl font-extrabold text-navy-800">Top Services Near You</h2>
            <Link to="/services" className="text-mmt-500 hover:text-mmt-600 text-xs font-bold uppercase tracking-wider no-underline flex items-center gap-1">
              See All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Home Deep Cleaning', price: '₹1,499', rating: '4.5', cat: 'home-cleaning' },
              { name: 'AC Service & Repair', price: '₹799', rating: '4.7', cat: 'ac-service' },
              { name: 'Pest Control', price: '₹1,299', rating: '4.6', cat: 'pest-control' },
              { name: 'Plumbing Repair', price: '₹599', rating: '4.2', cat: 'plumbing' },
            ].map((svc, i) => (
              <Link to={`/services?category=${svc.cat}`} key={i} className="card p-4 no-underline group">
                <div className="h-28 bg-navy-50 rounded flex items-center justify-center mb-3 group-hover:bg-mmt-50 transition-colors">
                  {(() => {
                    const catObj = categories.find(c => c.id === svc.cat);
                    if (catObj) {
                      const Icon = catObj.icon;
                      return <Icon className={`w-10 h-10 ${catObj.iconColor}`} />;
                    }
                    return <HomeIcon className="w-10 h-10 text-navy-400" />;
                  })()}
                </div>
                <h3 className="font-bold text-navy-800 text-sm mb-1 group-hover:text-mmt-500 transition-colors">{svc.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-mmt-600 font-extrabold text-sm">{svc.price}</span>
                  <span className="flex items-center gap-0.5 text-xs text-gold-600 font-semibold">
                    <Star className="w-3 h-3 fill-gold-400 text-gold-400" /> {svc.rating}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - MMT Style */}
      <section className="mmt-gradient py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Ready to Get Started?</h2>
          <p className="text-white/60 text-sm mb-8">Join thousands of satisfied customers and service providers</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/customer/signup" className="bg-mmt-500 hover:bg-mmt-600 text-white font-bold py-3 px-8 rounded text-sm inline-flex items-center justify-center gap-2 no-underline transition-colors">
              Book a Service <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/vendor/signup" className="border-2 border-white/40 text-white font-bold py-3 px-8 rounded text-sm hover:bg-white hover:text-navy-700 inline-flex items-center justify-center gap-2 no-underline transition-colors">
              Become a Vendor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
