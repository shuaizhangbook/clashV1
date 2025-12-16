// Wallet & Notifications API Services
import axios from '../axios';

export const walletAPI = {
  // Get wallet balance
  getBalance: async () => {
    const { data } = await axios.get('/api/v1/wallet/balance');
    return data;
  }
};

export const notificationsAPI = {
  // Get notifications
  getNotifications: async () => {
    const { data } = await axios.get('/api/v1/notifications');
    return data;
  },

  // Get announcements
  getAnnouncements: async () => {
    const { data } = await axios.get('/api/v1/announcements');
    return data;
  }
};
