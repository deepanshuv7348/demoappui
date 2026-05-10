import { Link } from 'react-router-dom';
import { Wrench, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-800 text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-mmt-500 rounded flex items-center justify-center">
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">
                Service<span className="text-mmt-400">Hub</span>
              </span>
            </div>
            <p className="text-white/50 text-sm mb-4 max-w-md">
              India's trusted platform for booking professional home services. Verified experts, transparent pricing, and guaranteed satisfaction.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-white/50 hover:text-mmt-400 text-sm transition-colors no-underline">All Services</Link></li>
              <li><Link to="/customer/signup" className="text-white/50 hover:text-mmt-400 text-sm transition-colors no-underline">Customer Sign Up</Link></li>
              <li><Link to="/vendor/signup" className="text-white/50 hover:text-mmt-400 text-sm transition-colors no-underline">Become a Vendor</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-white/50"><Mail className="w-4 h-4" /> support@servicehub.com</li>
              <li className="flex items-center gap-2 text-white/50"><Phone className="w-4 h-4" /> +91 1800-123-4567</li>
              <li className="flex items-center gap-2 text-white/50"><MapPin className="w-4 h-4" /> Mumbai, India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-xs text-white/30">
          &copy; {new Date().getFullYear()} ServiceHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
