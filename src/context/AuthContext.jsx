import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import mockApi from '../utils/mockApi';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_URL = import.meta.env.VITE_API_URL || '';
const useMockApi = !API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const userData = JSON.parse(localStorage.getItem('user') || 'null');
      if (userData) {
        setUser(userData);
        if (!useMockApi) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password, role) => {
    if (useMockApi) {
      const res = mockApi.login(email, password, role);
      const { token: newToken, user: userData } = res.data;
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);
      return userData;
    }
    const res = await axios.post(`${API_URL}/api/auth/login`, { email, password, role });
    const { token: newToken, user: userData } = res.data;
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    return userData;
  };

  const signupCustomer = async (data) => {
    if (useMockApi) {
      const res = mockApi.signupCustomer(data);
      const { token: newToken, user: userData } = res.data;
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);
      return userData;
    }
    const res = await axios.post(`${API_URL}/api/auth/signup/customer`, data);
    const { token: newToken, user: userData } = res.data;
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    return userData;
  };

  const signupVendor = async (data) => {
    if (useMockApi) {
      const res = mockApi.signupVendor(data);
      const { token: newToken, user: userData } = res.data;
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);
      return userData;
    }
    const res = await axios.post(`${API_URL}/api/auth/signup/vendor`, data);
    const { token: newToken, user: userData } = res.data;
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    return userData;
  };

  const sendOTP = async (phone) => {
    if (useMockApi) {
      return mockApi.sendOTP(phone);
    }
    const res = await axios.post(`${API_URL}/api/auth/send-otp`, { phone });
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user, token, loading,
      login, signupCustomer, signupVendor, sendOTP, logout,
      isAuthenticated: !!token
    }}>
      {children}
    </AuthContext.Provider>
  );
};
