import { axiosClient } from './axiosInstance';

export const setupInterceptors = () => {
  axiosClient.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error),
  );

  axiosClient.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
  );
};
