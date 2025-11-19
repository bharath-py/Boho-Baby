import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - adds authentication token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handles token refresh on 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
            refresh: refreshToken,
          });
          localStorage.setItem('access_token', response.data.access);
          return api(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const login = async (username, password) => {
  const response = await api.post('/auth/login/', { username, password });
  return response.data;
};

// Dashboard API
export const fetchDashboardData = async () => {
  const response = await api.get('/dashboard/');
  return response.data;
};

// Reports API
export const fetchReports = async () => {
  const response = await api.get('/reports/');
  // Handle both paginated and non-paginated responses
  return response.data.results || response.data || [];
};

export const createReport = async (reportData) => {
  const response = await api.post('/reports/', reportData);
  return response.data;
};

export const updateReport = async (reportId, reportData) => {
  const response = await api.put(`/reports/${reportId}/`, reportData);
  return response.data;
};

export default api;