// Nodes API Services
import axios from '../axios';

export const nodesAPI = {
  // Get all nodes
  getNodes: async () => {
    const { data } = await axios.get('/api/v1/nodes');
    return data;
  },

  // Connect to a node
  connectToNode: async (nodeId) => {
    const { data } = await axios.post(`/api/v1/nodes/${nodeId}/connect`);
    return data;
  },

  // Disconnect from a node
  disconnect: async (nodeId) => {
    const { data } = await axios.post(`/api/v1/nodes/${nodeId}/disconnect`);
    return data;
  }
};
