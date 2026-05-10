import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CustomerLogin from './pages/CustomerLogin';
import CustomerSignup from './pages/CustomerSignup';
import VendorLogin from './pages/VendorLogin';
import VendorSignup from './pages/VendorSignup';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import BookService from './pages/BookService';
import CustomerDashboard from './pages/CustomerDashboard';
import VendorDashboard from './pages/VendorDashboard';
import MyBookings from './pages/MyBookings';
import VendorBookings from './pages/VendorBookings';
import AddService from './pages/AddService';

function ProtectedRoute({ children, role }) {
  const { user, isAuthenticated, loading } = useAuth();
  if (loading || !user) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mmt-500"></div></div>;
  if (!isAuthenticated) return <Navigate to={role === 'customer' ? '/customer/login' : '/vendor/login'} />;
  if (user.role !== role) return <Navigate to="/" />;
  return children;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f4f4]">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/customer/login" element={<CustomerLogin />} />
          <Route path="/customer/signup" element={<CustomerSignup />} />
          <Route path="/vendor/login" element={<VendorLogin />} />
          <Route path="/vendor/signup" element={<VendorSignup />} />
          <Route path="/book/:id" element={<ProtectedRoute role="customer"><BookService /></ProtectedRoute>} />
          <Route path="/customer/dashboard" element={<ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>} />
          <Route path="/customer/bookings" element={<ProtectedRoute role="customer"><MyBookings /></ProtectedRoute>} />
          <Route path="/vendor/dashboard" element={<ProtectedRoute role="vendor"><VendorDashboard /></ProtectedRoute>} />
          <Route path="/vendor/bookings" element={<ProtectedRoute role="vendor"><VendorBookings /></ProtectedRoute>} />
          <Route path="/vendor/add-service" element={<ProtectedRoute role="vendor"><AddService /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
