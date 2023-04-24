import type { City } from '../../types/general';

export const citiesFetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<City[]>);

export const getCitiesAPI = (ids?: string | string[]) => {
  const env = process.env.NODE_ENV;
  const hostname = env === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_HOSTNAME;
  const params = new URLSearchParams({ id: String(ids) });
  const API = `${hostname}/api/cities?${params}`;
  return API;
};

export const getCityByCountryIdAPI = (id: number) => {
  const env = process.env.NODE_ENV;
  const hostname = env === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_HOSTNAME;
  const API = `${hostname}/api/cities/country/${id}`;
  return API;
};
