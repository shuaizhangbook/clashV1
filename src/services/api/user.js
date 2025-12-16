// User API Services
import axios from '../axios';

export const userAPI = {
  // Get user profile
  getProfile: async () => {
    const { data } = await axios.get('/api/v1/user/profile');
    return data;
  },

  // Get user subscription
  getSubscription: async () => {
    const { data } = await axios.get('/api/v1/user/subscription');
    return data;
  },

  // Get user devices
  getDevices: async () => {
    const { data } = await axios.get('/api/v1/user/devices');
    return data;
  }
};
