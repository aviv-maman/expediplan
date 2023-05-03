import type { Country } from '../../types/general';

export const countriesFetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<Country[]>);

export const getCountriesAPI = (ids?: number | number[]) => {
  const env = process.env.NODE_ENV;
  const hostname = env === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_HOSTNAME;
  const params = new URLSearchParams(ids ? { id: String(ids) } : undefined);
  const API = `${hostname}/api/countries?${params}`;
  return API;
};
