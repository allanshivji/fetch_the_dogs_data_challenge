import axios from 'axios';

const API_URL = 'https://frontend-take-home-service.fetch.com';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // for sending cookies with each request
});

// Authentication
export const login = async (name: string, email: string) => {
  const response = await api.post('/auth/login', { name, email });
  return response.status === 200
};

export const logout = () => {
  return api.post('/auth/logout');
};

// Fetch Breeds
export const getBreeds = async () => {
  const response = await api.get('/dogs/breeds');
  return response.data;
};

// Search Dogs
export const searchDogs = async (params: any) => {
  const response = await api.get('/dogs/search', { params });
  return response.data;
};

// Fetch Dog Details
export const getDogsByIds = async (ids: string[]) => {
  const response = await api.post('/dogs', ids);
  return response.data;
};

// Match Dogs
export const matchDogs = async (dogIds: string[]) => {
  const response = await api.post('/dogs/match', dogIds);
  return response.data;
};

// Fetch Locations by ZIP code(s)
export const getLocationsByZip = async (zipCodes: string[]) => {
  const response = await api.post('/locations', { zipCodes });
  return response.data;
};

// Search Locations by City and State
export const searchLocations = async (query: any) => {
  const response = await api.post('/locations/search', query );
  return response.data;
};

// Search Locations by Geographic Bounding Box (latitude/longitude)
export const searchLocationsByBounds = async (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const response = await api.post('/locations/search', { lat1, lon1, lat2, lon2 });
  return response.data;
};