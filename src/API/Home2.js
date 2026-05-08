// src/API/Home2.js
import axios from 'axios';

const BASE_URL = 'http://192.168.33.190:9000';

export const getAllServers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/server/all-servers`, {
      timeout: 5000, // 5 seconds gap
    });
    return response.data;
  } catch (error) {
    console.error(
      'Fetch Error Detail:',
      error.code === 'ECONNABORTED' ? 'Timeout hogaya' : error.message,
    );
    throw error;
  }
};


export const loginAPI = async ({ email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    const detail = error.response?.data?.detail;
    if (Array.isArray(detail)) {
      throw new Error(detail.map(d => d.msg).join('\n'));
    }
    throw new Error(detail || 'Network Error');
  }
};