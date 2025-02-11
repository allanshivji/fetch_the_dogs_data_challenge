import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Define the type for the navigation callback
type NavigationCallback = () => void;

// Initialize with a no-op function
let navigationCallback: NavigationCallback = () => {};
export const setNavigationCallback = (callback: NavigationCallback): void => {
  navigationCallback = callback;
};

const authAxios: AxiosInstance = axios.create({
  validateStatus: (status: number): boolean => {
    return (
      status === 400 ||
      status === 401 ||
      (status >= 200 && status < 300) ||
      status >= 500
    );
  },
  withCredentials: true
});

authAxios.interceptors.request.use(
  (config) => {
    config.timeout = 2 * 60 * 1000;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

authAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 400) {
      console.error('Bad Request');
      return Promise.reject(response);
    }
    if (response.status === 401) {
      console.error('Unauthorized');
      navigationCallback();
      return Promise.reject(response);
    }
    if (response.status === 500) {
      console.error('Internal Server Error');
      return Promise.reject(response);
    }
    return response;
  },
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      console.error('Unauthorized');
      navigationCallback();
    }
    return Promise.reject(error);
  }
);

export default authAxios;
