import axios from 'axios';

const axiosInstanceConfig = {
  baseURL: `${process.env.REACT_APP_API_BASE_PATH}${process.env.REACT_APP_API_BASE_MODIFIER}`,
  timeout: 10000,
};

const axiosInstance = axios.create(axiosInstanceConfig);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Interceptor - Response - ', response);
    return response.data;
  },
  (error) => {
    console.log('Interceptor - Error - ', error?.response);
    return Promise.reject(error);
  }
);

// Instance Used By Auth Service Only
const axiosAuthConfig = {
  baseURL: `${process.env.REACT_APP_API_BASE_PATH}${process.env.REACT_APP_API_BASE_MODIFIER}`,
  timeout: 10000,
};

export const axiosAuthInstance = axios.create(axiosAuthConfig);

axiosAuthInstance.interceptors.response.use(
  (response) => {
    console.log('Interceptor - Response - ', response);
    return response;
  },
  (error) => {
    console.log('Interceptor - Error - ', error?.response);
    return Promise.reject(error);
  }
);

export default axiosInstance;
