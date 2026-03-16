import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token API endpoints
export const tokenAPI = {
  // Create a new token
  createToken: async (phoneNumber, priority = 2) => {
    const response = await api.post('/tokens', {
      phone_number: phoneNumber,
      priority,
    });
    return response.data;
  },

  // Create an emergency token
  createEmergencyToken: async (phoneNumber) => {
    const response = await api.post('/tokens/emergency', {
      phone_number: phoneNumber,
    });
    return response.data;
  },

  // Call next token
  callNext: async () => {
    const response = await api.post('/tokens/next');
    return response.data;
  },

  // Complete current token
  completeToken: async () => {
    const response = await api.post('/tokens/complete');
    return response.data;
  },

  // Get queue status
  getStatus: async () => {
    const response = await api.get('/tokens/status');
    return response.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;
