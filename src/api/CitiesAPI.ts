import type { City } from '../../types/general';
import { HOSTNAME } from '@/constants';

export const citiesFetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<City[]>);
export const cityFetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<City>);

export const getCitiesAPI = (ids?: number | number[]) => {
  const params = new URLSearchParams({ id: String(ids) });
  const API = `${HOSTNAME}/api/cities?${params}`;
  return API;
};

export const getCitiesByCountryIdAPI = (id: number) => {
  const API = `${HOSTNAME}/api/cities/country/${id}`;
  return API;
};

export const getCityByIdAPI = (id: number) => {
  const API = `${HOSTNAME}/api/cities/${id}`;
  return API;
};

export const getCityById = async (id: number): Promise<City> => {
  const API = getCityByIdAPI(id);
  const res = await fetch(API, {
    // headers: { Authorization: `token ${TOKEN}` },
    // next: { revalidate: 3600 },
    // cache: 'no-cache',
  });
  if (!res.ok) {
    // This will activate the closest `error.tsx` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  if (data.message) {
    throw new Error(data.message);
  }
  return data as City;
};
