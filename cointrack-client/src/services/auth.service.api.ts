import { LoginReq, LoginRes, RegisterReq, RegisterRes, UserRes } from '@/types/auth.types';
import { appApi } from './app.service.api';
import axios from 'axios';

export const loginFn = async (authData: LoginReq) => {
  const response = await appApi.post<LoginRes>('/auth/login', authData);
  const { access_token } = response.data;
  localStorage.setItem('access_token', access_token);
  return response.data;
};

export const registerFn = async (authData: RegisterReq) => {
  const response = await appApi.post<RegisterRes>('/auth/register', authData);
  const { access_token } = response.data;
  localStorage.setItem('access_token', access_token);
  return response.data;
};

export const logoutFn = async () => {
  try {
    await appApi.post('auth/logout');
  } catch (error) {
    console.warn('Logout server request failed, but clearing local state anyway.');
  } finally {
    localStorage.removeItem('access_token');
  }
};

export const profileFn = async () => {
  const response = await appApi.get<UserRes>('/auth/profile');
  return response.data;
};

const refreshApi = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

export const refreshTokenFn = async () => {
  try {
    const response = await refreshApi.post('/auth/refresh');
    const newToken = response.data.accessToken || response.data.access_token;

    if (!newToken) {
      console.error('No access token in refresh response:', response.data);
      throw new Error('No access token received');
    }

    localStorage.setItem('access_token', newToken);
    return newToken;
  } catch (error) {
    console.error('Refresh token error:', error);
    throw error;
  }
};
