import { HOSTNAME } from '@/constants';
import { dateToYYYYMMDD } from '@/helpers/processInfo';
import type { WeatherResponse } from '../../types/general';

const getRealtimeWeatherByDecimalDegreeAPI = (latitude: number, longitude: number) => {
  const params = new URLSearchParams({ q: `${String(latitude)},${String(longitude)}` });
  const API = `${HOSTNAME}/api/weather/realtime?${params}`;
  return API;
};

const getForecastWeatherByDecimalDegreeAPI = (latitude: number, longitude: number) => {
  const params = new URLSearchParams({ q: `${String(latitude)},${String(longitude)}` });
  const API = `${HOSTNAME}/api/weather/forecast?${params}`;
  return API;
};

type HistoryWeatherAPIParams = {
  latitude: number;
  longitude: number;
  date?: Date;
  endDate?: Date;
  hour?: number;
};

const getHistoryWeatherByDecimalDegreeAPI = (options: HistoryWeatherAPIParams) => {
  const startDate = options.date ? dateToYYYYMMDD(options.date) : '';
  const endDate = options.endDate ? dateToYYYYMMDD(options.endDate) : '';
  const params = new URLSearchParams({
    q: `${String(options.latitude)},${String(options.longitude)}`,
    dt: startDate,
    end_dt: endDate,
    hour: String(options.hour),
  });
  const API = `${HOSTNAME}/api/weather/history?${params}`;
  return API;
};

export const getRealtimeWeatherByDecimalDegree = async (latitude: number, longitude: number) => {
  const API = getRealtimeWeatherByDecimalDegreeAPI(latitude, longitude);
  const res = await fetch(API);
  // This will activate the closest `error.tsx` Error Boundary
  // throw new Error('Failed to fetch data');
  if (!res.ok) return undefined;
  const data = await res.json();
  if (data.message) throw new Error(data.message);
  return data as WeatherResponse;
};
