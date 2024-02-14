import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_URL } from '../constants/http';
import { IAuthResponse } from "../types/IAuthResponse";

const serverApi = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  // proxy: {
  //   host: '127.0.0.1',
  //   port: 4040
  // }
});

serverApi.interceptors.request.use((config) => {
  // console.log('config', config)
  if (!config.headers) return config;
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  // console.log('config2', config)
  return config;
});

serverApi.interceptors.response.use((config: AxiosResponse) => {
  return config;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status == 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.get<IAuthResponse>(`${API_URL}users/refresh`, {withCredentials: true});
      localStorage.setItem('token', response.data.accessToken);
      return serverApi.request(originalRequest);
      
    } catch (error) {
      console.log('NOT AUTH')
    }
  }
  throw error;
})

export default serverApi;
