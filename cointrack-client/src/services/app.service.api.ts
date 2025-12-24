import axios, { AxiosError } from 'axios';
import { logoutFn, refreshTokenFn } from './auth.service.api';

export const appApi = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

appApi.defaults.headers.common['Content-Type'] = 'application/json';

appApi.interceptors.request.use(
  (req) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
  },
  (error) => {
    Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: unknown) => void; reject: (error: any) => void }> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

appApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    const isAuthEndpoint =
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/register') ||
      originalRequest.url?.includes('/auth/refresh-token');

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token && originalRequest.headers) {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
            }
            return appApi(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log('Attempting to refresh access token...');
        const newAccessToken = await refreshTokenFn();
        console.log('Access token refreshed successfully');

        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }

        processQueue(null, newAccessToken);

        return appApi(originalRequest);
      } catch (refreshError: any) {
        console.error('Refresh token failed:', refreshError);
        processQueue(refreshError, null);

        localStorage.removeItem('access_token');

        if (
          typeof window !== 'undefined' &&
          !window.location.pathname.includes('/login') &&
          !window.location.pathname.includes('/register')
        ) {
          window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (
      (error.response?.status === 401 || error.response?.status === 404) &&
      (error.response?.data as any)?.message?.includes('User not found')
    ) {
      console.error('User not found in database');

      await logoutFn();

      if (
        typeof window !== 'undefined' &&
        !window.location.pathname.includes('/login') &&
        !window.location.pathname.includes('/register')
      ) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);
