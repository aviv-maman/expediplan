import { getPlanByIdFromLocalStorage } from './PlansAPI';
import type { Attraction } from '../../types/general';

export const attractionsFetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<Attraction[]>);
export const attractionFetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<Attraction>);

export const getAttractionsAPI = (ids?: number | number[]) => {
  const env = process.env.NODE_ENV;
  const hostname = env === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_HOSTNAME;
  const params = new URLSearchParams(ids ? { id: String(ids) } : undefined);
  const API = `${hostname}/api/attractions?${params}`;
  return API;
};

//Client: To use in form
export const getAttractionsByCityIdAPI = (id: number) => {
  const env = process.env.NODE_ENV;
  const hostname = env === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_HOSTNAME;
  const API = `${hostname}/api/attractions/city/${id}`;
  return API;
};

export const getAttractionByIdAPI = (id: number) => {
  const env = process.env.NODE_ENV;
  const hostname = env === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_HOSTNAME;
  const API = `${hostname}/api/attractions/${id}`;
  return API;
};

export const getAttractionsByPlanIdAPI = (id: string) => {
  const env = process.env.NODE_ENV;
  const hostname = env === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_HOSTNAME;
  const API = `${hostname}/api/attractions/plan/${id}`;
  return API;
};

//Client
export const getAttractionsByPlanIdFromLocalStorage = (id: string) => {
  const plan = getPlanByIdFromLocalStorage(id);
  if (!plan) return [];
  const days = plan?.days;
  const attractionIds: number[] = [];
  days.forEach((day) => {
    day.interests?.forEach((interest) => {
      attractionIds.push(interest.attraction_id);
    });
  });
  return attractionIds;
};
