'use client';
import { selectorFamily } from 'recoil';
import type { City } from '../../types/general';
import { getRealtimeWeatherByDecimalDegree } from '@/api/WeatherAPI';
import { getCityByIdAPI } from '@/api/CitiesAPI';

export const citySelectorFamily = selectorFamily({
  key: 'city',
  get: (cityId: number) => async () => {
    const API = getCityByIdAPI(cityId);
    const response = await fetch(API);
    if (!response.ok) throw new Error('Failed to fetch city!');
    return (await response.json()) as City | undefined;
  },
});

export const weatherSelectorFamily = selectorFamily({
  key: 'weather',
  get:
    (cityId: number) =>
    async ({ get }) => {
      const city = get(citySelectorFamily(cityId));
      if (!city) throw new Error('Failed to fetch city!');
      const weather = await getRealtimeWeatherByDecimalDegree(city.latitude, city.longitude);
      return weather;
    },
});
