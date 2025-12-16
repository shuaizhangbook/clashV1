// Authentication API Services
import axios from '../axios';

export const authAPI = {
  // User login
  login: async (email, password) => {
    const { data } = await axios.post('/api/v1/auth/login', {
      email,
      password
    });
    return data;
  },

  // User logout
  logout: async () => {
    const { data } = await axios.post('/api/v1/auth/logout');
    return data;
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    const { data } = await axios.post('/api/v1/auth/refresh', {
      refreshToken
    });
    return data;
  }
};
