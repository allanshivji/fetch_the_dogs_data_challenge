import { API_URL } from '../constants/api.constants';
import authAxios from './app.service';
import axios from 'axios';

export const API = {
  GET_BREEDS: () => authAxios.get(API_URL.DOGS_BREEDS),
  SEARCH_DOGS: (...args: any) => authAxios.get(API_URL.DOGS_SEARCH, ...args),
  GET_DOGS_BY_ID: (...args: any) => authAxios.post(API_URL.DOGS, ...args),
  MATCH_DOGS: (...args: any) => authAxios.post(API_URL.DOGS_MATCH, ...args),
  GET_LOCATIONS_BY_ZIP: (...args: any) =>
    authAxios.post(API_URL.LOCATIONS, ...args),
  SEARCH_LOCATIONS: (...args: any) =>
    authAxios.post(API_URL.LOCATIONS_SEARCH, ...args),
  SEARCH_LOCATIONS_BY_BOUNDS: (...args: any) =>
    authAxios.post(API_URL.LOCATIONS_SEARCH, ...args),
  LOGIN: (...args: any) =>
    axios.post(API_URL.LOGIN, ...args, { withCredentials: true }),
  LOGOUT: () => axios.post(API_URL.LOGOUT, {}, { withCredentials: true })
};
