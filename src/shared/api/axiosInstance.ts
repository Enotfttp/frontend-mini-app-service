import Axios, { AxiosRequestConfig } from 'axios';

// Raw Axios instance — use for interceptors setup
export const axiosClient = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Functional wrapper — use in entity/feature API calls
export const axiosInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = axiosClient({
    ...config,
    cancelToken: source.token,
  }).then(({ data }) => data);

  promise['cancel'] = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

export default axiosInstance;
