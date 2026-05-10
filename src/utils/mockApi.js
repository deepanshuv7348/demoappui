// Mock API layer using localStorage for demo deployment
// When backend is available, real API calls are used instead

const STORAGE_KEYS = {
  USERS: 'servicehub_users',
  SERVICES: 'servicehub_services',
  BOOKINGS: 'servicehub_bookings',
  OTP_STORE: 'servicehub_otp_store'
};

const generateId = () => Math.random().toString(36).substr(2, 9) + Date.now().toString(36);

const getStore = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch { return []; }
};

const setStore = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Seed initial data if not present
const seedData = () => {
  const users = getStore(STORAGE_KEYS.USERS);
  if (users.length === 0) {
    const demoUsers = [
      {
        _id: 'demo_customer_001',
        name: 'Rahul Sharma',
        email: 'customer@demo.com',
        phone: '9876543210',
        password: 'customer123',
        role: 'customer',
        isVerified: true
      },
      {
        _id: 'demo_vendor_001',
        name: 'Amit Patel',
        email: 'vendor@demo.com',
        phone: '9876543211',
        password: 'vendor123',
        role: 'vendor',
        isVerified: true
      }
    ];
    setStore(STORAGE_KEYS.USERS, demoUsers);

    const demoServices = [
      { _id: 'svc_001', name: 'Deep Home Cleaning', description: 'Professional deep cleaning service for your entire home. Includes kitchen, bathrooms, bedrooms, and living areas. We use eco-friendly products.', category: 'home-cleaning', price: 1499, vendor: 'demo_vendor_001', vendorName: 'Amit Patel', location: 'Mumbai', rating: 4.5, reviews: 128, available: true, image: '' },
      { _id: 'svc_002', name: 'Pipe Repair & Installation', description: 'Expert plumbing services for pipe repair, replacement, and new installations. Quick response time with guaranteed workmanship.', category: 'plumbing', price: 599, vendor: 'demo_vendor_001', vendorName: 'Amit Patel', location: 'Delhi', rating: 4.2, reviews: 85, available: true, image: '' },
      { _id: 'svc_003', name: 'AC Service & Repair', description: 'Complete AC servicing including gas refill, filter cleaning, and repair. All brands supported. Same day service available.', category: 'ac-service', price: 799, vendor: 'demo_vendor_001', vendorName: 'Amit Patel', location: 'Bangalore', rating: 4.7, reviews: 210, available: true, image: '' },
      { _id: 'svc_004', name: 'Interior Wall Painting', description: 'Professional interior painting with premium quality paint. Color consultation included. Clean and hassle-free experience.', category: 'painting', price: 4999, vendor: 'demo_vendor_001', vendorName: 'Amit Patel', location: 'Pune', rating: 4.3, reviews: 67, available: true, image: '' },
      { _id: 'svc_005', name: 'Electrical Wiring & Repair', description: 'Certified electricians for all electrical work - wiring, switch installation, MCB repair, and more. Safety guaranteed.', category: 'electrical', price: 449, vendor: 'demo_vendor_001', vendorName: 'Amit Patel', location: 'Hyderabad', rating: 4.4, reviews: 93, available: true, image: '' },
      { _id: 'svc_006', name: 'Pest Control Treatment', description: 'Comprehensive pest control for cockroaches, termites, bed bugs, and mosquitoes. Safe chemicals, long-lasting protection.', category: 'pest-control', price: 1299, vendor: 'demo_vendor_001', vendorName: 'Amit Patel', location: 'Chennai', rating: 4.6, reviews: 156, available: true, image: '' },
      { _id: 'svc_007', name: 'Custom Furniture & Repair', description: 'Expert carpenters for furniture making, repair, and modification. Wardrobes, tables, chairs - all types of woodwork.', category: 'carpentry', price: 899, vendor: 'demo_vendor_001', vendorName: 'Amit Patel', location: 'Kolkata', rating: 4.1, reviews: 44, available: true, image: '' },
      { _id: 'svc_008', name: 'House Shifting Service', description: 'Safe and reliable packing & moving service. Bubble wrap packing, dedicated truck, and insurance coverage included.', category: 'moving-packing', price: 5999, vendor: 'demo_vendor_001', vendorName: 'Amit Patel', location: 'Mumbai', rating: 4.0, reviews: 72, available: true, image: '' }
    ];
    setStore(STORAGE_KEYS.SERVICES, demoServices);
    setStore(STORAGE_KEYS.BOOKINGS, []);
  }
};

seedData();

// Simple JWT-like token generation (for demo)
const createToken = (user) => {
  return btoa(JSON.stringify({ id: user._id, role: user.role, name: user.name, email: user.email }));
};

const verifyToken = (token) => {
  try {
    return JSON.parse(atob(token));
  } catch { return null; }
};

// Mock API handlers
const mockApi = {
  // Auth
  sendOTP: (phone) => {
    const users = getStore(STORAGE_KEYS.USERS);
    const exists = users.find(u => u.phone === phone);
    if (exists) throw { response: { data: { message: 'Phone number already registered' } } };
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpStore = JSON.parse(localStorage.getItem(STORAGE_KEYS.OTP_STORE) || '{}');
    otpStore[phone] = { otp, expiresAt: Date.now() + 300000 };
    localStorage.setItem(STORAGE_KEYS.OTP_STORE, JSON.stringify(otpStore));
    return { data: { message: 'OTP sent successfully', otp } };
  },

  signupCustomer: (data) => {
    const { name, email, phone, password, otp } = data;
    const users = getStore(STORAGE_KEYS.USERS);
    
    // Verify OTP
    const otpStore = JSON.parse(localStorage.getItem(STORAGE_KEYS.OTP_STORE) || '{}');
    const storedOtp = otpStore[phone];
    if (!storedOtp) throw { response: { data: { message: 'OTP not requested' } } };
    if (storedOtp.expiresAt < Date.now()) throw { response: { data: { message: 'OTP expired' } } };
    if (storedOtp.otp !== otp) throw { response: { data: { message: 'Invalid OTP' } } };

    if (users.find(u => u.email === email)) throw { response: { data: { message: 'Email already registered' } } };
    if (users.find(u => u.phone === phone)) throw { response: { data: { message: 'Phone already registered' } } };

    const newUser = { _id: generateId(), name, email, phone, password, role: 'customer', isVerified: true };
    users.push(newUser);
    setStore(STORAGE_KEYS.USERS, users);
    delete otpStore[phone];
    localStorage.setItem(STORAGE_KEYS.OTP_STORE, JSON.stringify(otpStore));

    const token = createToken(newUser);
    return { data: { message: 'Customer registered successfully', token, user: { id: newUser._id, name, email, phone, role: 'customer' } } };
  },

  signupVendor: (data) => {
    const { name, email, phone, password } = data;
    const users = getStore(STORAGE_KEYS.USERS);
    if (users.find(u => u.email === email)) throw { response: { data: { message: 'Email already registered' } } };
    if (users.find(u => u.phone === phone)) throw { response: { data: { message: 'Phone already registered' } } };

    const newUser = { _id: generateId(), name, email, phone, password, role: 'vendor', isVerified: true };
    users.push(newUser);
    setStore(STORAGE_KEYS.USERS, users);

    const token = createToken(newUser);
    return { data: { message: 'Vendor registered successfully', token, user: { id: newUser._id, name, email, phone, role: 'vendor' } } };
  },

  login: (email, password, role) => {
    const users = getStore(STORAGE_KEYS.USERS);
    const user = users.find(u => u.email === email && u.password === password && u.role === role);
    if (!user) throw { response: { data: { message: `Invalid credentials or not a ${role} account` } } };

    const token = createToken(user);
    return { data: { message: 'Login successful', token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role } } };
  },

  // Services
  getServices: (params = {}) => {
    let services = getStore(STORAGE_KEYS.SERVICES).filter(s => s.available);
    if (params.category) services = services.filter(s => s.category === params.category);
    if (params.location) services = services.filter(s => s.location.toLowerCase().includes(params.location.toLowerCase()));
    if (params.search) {
      const q = params.search.toLowerCase();
      services = services.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
    }
    // Add vendor info
    const users = getStore(STORAGE_KEYS.USERS);
    services = services.map(s => ({
      ...s,
      vendor: users.find(u => u._id === s.vendor) || { name: s.vendorName || 'Vendor', phone: 'N/A' }
    }));
    return { data: services };
  },

  getService: (id) => {
    const services = getStore(STORAGE_KEYS.SERVICES);
    const service = services.find(s => s._id === id);
    if (!service) throw { response: { data: { message: 'Service not found' } } };
    const users = getStore(STORAGE_KEYS.USERS);
    return { data: { ...service, vendor: users.find(u => u._id === service.vendor) || { name: service.vendorName || 'Vendor', phone: 'N/A' } } };
  },

  getVendorServices: (token) => {
    const decoded = verifyToken(token);
    if (!decoded) throw { response: { data: { message: 'Not authorized' } } };
    const services = getStore(STORAGE_KEYS.SERVICES).filter(s => s.vendor === decoded.id);
    return { data: services };
  },

  createService: (data, token) => {
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'vendor') throw { response: { data: { message: 'Not authorized' } } };
    const services = getStore(STORAGE_KEYS.SERVICES);
    const newService = { _id: generateId(), ...data, vendor: decoded.id, vendorName: decoded.name, rating: 4.0, reviews: 0, available: true };
    services.push(newService);
    setStore(STORAGE_KEYS.SERVICES, services);
    return { data: { message: 'Service created successfully', service: newService } };
  },

  // Bookings
  createBooking: (data, token) => {
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'customer') throw { response: { data: { message: 'Not authorized' } } };
    const services = getStore(STORAGE_KEYS.SERVICES);
    const service = services.find(s => s._id === data.serviceId);
    if (!service) throw { response: { data: { message: 'Service not found' } } };

    const bookings = getStore(STORAGE_KEYS.BOOKINGS);
    const newBooking = {
      _id: generateId(),
      service: { _id: service._id, name: service.name, category: service.category, price: service.price },
      customer: { _id: decoded.id, name: decoded.name, email: decoded.email, phone: '' },
      vendor: { _id: service.vendor, name: service.vendorName || 'Vendor', phone: 'N/A' },
      status: 'pending',
      bookingDate: data.bookingDate,
      notes: data.notes || '',
      address: data.address,
      createdAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    setStore(STORAGE_KEYS.BOOKINGS, bookings);
    return { data: { message: 'Booking created successfully', booking: newBooking } };
  },

  getCustomerBookings: (token) => {
    const decoded = verifyToken(token);
    if (!decoded) throw { response: { data: { message: 'Not authorized' } } };
    const bookings = getStore(STORAGE_KEYS.BOOKINGS).filter(b => b.customer._id === decoded.id);
    return { data: bookings.reverse() };
  },

  getVendorBookings: (token) => {
    const decoded = verifyToken(token);
    if (!decoded) throw { response: { data: { message: 'Not authorized' } } };
    const bookings = getStore(STORAGE_KEYS.BOOKINGS).filter(b => b.vendor._id === decoded.id);
    return { data: bookings.reverse() };
  },

  acceptBooking: (bookingId, token) => {
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'vendor') throw { response: { data: { message: 'Not authorized' } } };
    const bookings = getStore(STORAGE_KEYS.BOOKINGS);
    const booking = bookings.find(b => b._id === bookingId);
    if (!booking) throw { response: { data: { message: 'Booking not found' } } };
    if (booking.vendor._id !== decoded.id) throw { response: { data: { message: 'Not authorized' } } };
    if (booking.status !== 'pending') throw { response: { data: { message: 'Booking cannot be accepted' } } };
    booking.status = 'accepted';
    setStore(STORAGE_KEYS.BOOKINGS, bookings);
    return { data: { message: 'Booking accepted', booking } };
  },

  deliverBooking: (bookingId, token) => {
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'vendor') throw { response: { data: { message: 'Not authorized' } } };
    const bookings = getStore(STORAGE_KEYS.BOOKINGS);
    const booking = bookings.find(b => b._id === bookingId);
    if (!booking) throw { response: { data: { message: 'Booking not found' } } };
    if (booking.vendor._id !== decoded.id) throw { response: { data: { message: 'Not authorized' } } };
    if (booking.status !== 'accepted') throw { response: { data: { message: 'Booking must be accepted first' } } };
    booking.status = 'delivered';
    setStore(STORAGE_KEYS.BOOKINGS, bookings);
    return { data: { message: 'Booking marked as delivered', booking } };
  },

  cancelBooking: (bookingId, token) => {
    const decoded = verifyToken(token);
    if (!decoded) throw { response: { data: { message: 'Not authorized' } } };
    const bookings = getStore(STORAGE_KEYS.BOOKINGS);
    const booking = bookings.find(b => b._id === bookingId);
    if (!booking) throw { response: { data: { message: 'Booking not found' } } };
    if (booking.status === 'delivered') throw { response: { data: { message: 'Delivered bookings cannot be cancelled' } } };
    booking.status = 'cancelled';
    setStore(STORAGE_KEYS.BOOKINGS, bookings);
    return { data: { message: 'Booking cancelled', booking } };
  }
};

export default mockApi;
