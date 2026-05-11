import axios from 'axios';
import { Alert } from 'react-native';

const BASE_URL = 'http://192.168.36.190:9000';
const handleError = error => {
  const detail = error.response?.data?.detail;
  const message = typeof detail === 'string' ? detail : error.message;
  throw new Error(message);
};

export const addServerToDB = async payload => {
  const response = await axios.post(`${BASE_URL}/server/add-server`, payload);
  return response.data;
};

export const getAllRoutes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/route/all-routes`);
    return response.data;
  } catch (error) {
    console.log('Routes Error:', error.response?.data || error.message);
    return [];
  }
};

export const getAllServers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/server/all-servers`);
    return response.data;
  } catch (error) {
    console.log('Servers Error:', error.response?.data || error.message);
    return [];
  }
};

export const getServerEndpoints = async serverId => {
  try {
    const response = await axios.get(
      `${BASE_URL}/endpoint/server-endpoint/${serverId}`,
    );
    return response.data;
  } catch (error) {
    console.log('Endpoints Error:', error.response?.data || error.message);
    return [];
  }
};

export const addRoute = async payload => {
  const response = await axios.post(`${BASE_URL}/route/add-route`, payload);
  return response.data;
};

export const addEndpoint = async data => {
  const response = await axios.post(`${BASE_URL}/endpoint/add-endpoint`, data);
  return response.data;
};

export const getFieldsByEndpoint = async endpointId => {
  try {
    const response = await axios.get(
      `${BASE_URL}/endpoint/endpoint_field_path/${endpointId}`,
    );
    return response.data;
  } catch (error) {
    console.log('Fields Error:', error.response?.data || error.message);
    return [];
  }
};

export const getMappingRules = async routeId => {
  try {
    const response = await axios.get(
      `${BASE_URL}/route/mapping_rules/${routeId}`,
    );
    return response.data;
  } catch (error) {
    console.log('Mapping Rules Error:', error.response?.data || error.message);
    return [];
  }
};

export const getMappingSuggestion = async ({ src_server_id, dest_server_id, src_field_ids, dest_field_ids }) => {
  try {
    const params = new URLSearchParams();
    src_field_ids.forEach(id => params.append('src_field_ids', id));
    dest_field_ids.forEach(id => params.append('dest_field_ids', id));
    
    const response = await axios.get(
      `${BASE_URL}/route/mapping_suggestion/src_server_id/${src_server_id}/dest_server_id/${dest_server_id}?${params}`
    );
    return response.data;
  } catch (error) { handleError(error); }
};


export const getLogs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/logs/show-logs`);
    return response.data;
  } catch (error) {
    console.log('Logs Error:', error.response?.data || error.message);
    return [];
  }
};

export const getLogById = async (log_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/logs/show-log-msg/${log_id}`);
    return response.data;
  } catch (error) {
    console.log('Log Detail Error:', error.response?.data || error.message);
    return null;
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, payload); // ✅ sahi URL
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const signupUser = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/sign-up`, payload); // ✅ sahi URL
    return response.data;
  } catch (error) {
    handleError(error);
  }
};