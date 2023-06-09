import axios from 'axios';
import {Constants, Storage} from '../utils';
import Config from 'react-native-config';
import {API, Axios, Urls} from '.';

export const instance = axios.create({
  baseURL: Config.BASE_URL,
});

instance.interceptors.request.use(
  async config => {
    const token = await Storage.getDataFromStorage(Constants.AUTH_TOKEN);
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const authToken = await Storage.getDataFromStorage(Constants.AUTH_TOKEN);
      const response = await API.POST_RAW(Urls.AUTH, {tokenId: authToken});
      if (response.status === 200) {
        await Storage.saveInStorage(Constants.AUTH_TOKEN, response.data?.token);

        originalRequest.headers[
          'Authorization'
        ] = `Bearer ${response.data?.token}`;
        return Axios.instance(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);
