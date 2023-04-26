import type { City } from '../../types/general';

export const citiesFetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<City[]>);

export const getCitiesAPI = (ids?: string | string[]) => {
  const env = process.env.NODE_ENV;
  const hostname = env === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_HOSTNAME;
  const params = new URLSearchParams({ id: String(ids) });
  const API = `${hostname}/api/cities?${params}`;
  return API;
};

export const getCitiesByCountryIdAPI = (id: number) => {
  const env = process.env.NODE_ENV;
  const hostname = env === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_HOSTNAME;
  const API = `${hostname}/api/cities/country/${id}`;
  return API;
};

export const getCityByIdAPI = (id: number) => {
  const env = process.env.NODE_ENV;
  const hostname = env === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_HOSTNAME;
  const API = `${hostname}/api/cities/${id}`;
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
