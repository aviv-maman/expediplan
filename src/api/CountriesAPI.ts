import type { Country } from '../../types/general';
import { HOSTNAME } from '@/constants';

export const countriesFetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<Country[]>);
export const countryFetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<Country>);

export const getCountriesAPI = (ids?: number | number[]) => {
  const params = new URLSearchParams(ids ? { id: String(ids) } : undefined);
  const API = `${HOSTNAME}/api/countries?${params}`;
  return API;
};

export const getCountryByIdAPI = (id: number) => {
  const API = `${HOSTNAME}/api/countries/${id}`;
  return API;
};

export const getCountryById = async (id: number): Promise<Country | undefined> => {
  const API = getCountryByIdAPI(id);
  const res = await fetch(API, {
    // headers: { Authorization: `token ${TOKEN}` },
    // next: { revalidate: 3600 },
    // cache: 'no-cache',
  });
  if (!res.ok) {
    // This will activate the closest `error.tsx` Error Boundary
    // throw new Error('Failed to fetch data');
    return undefined;
  }
  const data = await res.json();
  if (data.message) {
    throw new Error(data.message);
  }
  return data as Country;
};
