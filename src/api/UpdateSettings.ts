import { SiteSettings } from '../../types/general';
import { HOSTNAME } from '@/constants';

export const updateWebsiteSettings = async (settings: SiteSettings) => {
  const API = `${HOSTNAME}/api/update-settings`;
  const res = await fetch(API, { method: 'POST', body: JSON.stringify(settings) });
  // This will activate the closest `error.tsx` Error Boundary
  // throw new Error('Failed to fetch data');
  if (!res.ok) return undefined;
  const data = await res.json();
  if (data.message) throw new Error(data.message);
  return data as { temp_unit: 'c' | 'f' };
};
