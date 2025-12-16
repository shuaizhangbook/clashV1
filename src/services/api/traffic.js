// Traffic & Statistics API Services
import axios from '../axios';

export const trafficAPI = {
  // Get daily traffic stats
  getDailyTraffic: async (days = 7) => {
    const { data } = await axios.get('/api/v1/stats/traffic/daily', {
      params: { days }
    });
    return data;
  },

  // Get connection logs
  getConnectionLogs: async (limit = 10) => {
    const { data } = await axios.get('/api/v1/stats/connection-logs', {
      params: { limit }
    });
    return data;
  }
};
