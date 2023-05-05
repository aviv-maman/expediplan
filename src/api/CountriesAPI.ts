import type { Country } from '../../types/general';
import { HOSTNAME } from '@/constants';

export const countriesFetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<Country[]>);

export const getCountriesAPI = (ids?: number | number[]) => {
  const params = new URLSearchParams(ids ? { id: String(ids) } : undefined);
  const API = `${HOSTNAME}/api/countries?${params}`;
  return API;
};
