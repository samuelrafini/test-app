import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// import { loadState } from './localStorage';

interface Response<T> {
  data: T;
}

function mapResponse<T>(response: Response<T>): T {
  return response.data;
}

export const defaultHeaders = {
  'content-type': 'application/json',
};

export default async function fetchApi<T>(
  endpoint: string,
  options: AxiosRequestConfig,
) {
  const baseUrl = 'https://www.balldontlie.io/api/v1';

  return axios(`${baseUrl}${endpoint}`, options)
    .then((response: AxiosResponse<any>) => {
      const responseData = response.data
      ? mapResponse<T>(response)
      : ((response as unknown) as T);
      return responseData;
    })
    .catch((error) => {
      return error;
    });
}
