import { API_URL } from '@/constants/env';
import { PATH_LOGIN } from '@/constants/public-routes';
import { getUserToken, removeUserInfos } from '@/queries/auth';
import axios from 'axios';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = getUserToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      (error.response && error.response.status === 403) ||
      (error.response && error.response.result.sucess === false)
    ) {
      removeUserInfos();
      window.location.href = PATH_LOGIN;
    }
    return Promise.reject(error);
  }
);

export default api;
