import { getPlanByIdFromLocalStorage } from './PlansAPI';
import type { Attraction, Interest, Plan } from '../../types/general';
import { CategoryName, HOSTNAME } from '@/constants';
import { fakeDelay } from '@/helpers/network';

export const attractionsFetcher = (url: string) =>
  fetch(url).then(async (res) => {
    await fakeDelay(1);
    return res.json() as Promise<Attraction[]>;
  });
export const attractionFetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<Attraction>);

export const getAttractionsAPI = (ids?: number | number[]) => {
  const params = new URLSearchParams(ids ? { id: String(ids) } : undefined);
  const API = `${HOSTNAME}/api/attractions?${params}`;
  return API;
};

//Client: To use in city page
export const getAttractionsByCityIdAPI = (id: number, categories?: CategoryName | CategoryName[]) => {
  const params = new URLSearchParams(categories ? { category: String(categories) } : undefined);
  const API = `${HOSTNAME}/api/attractions/city/${id}?${params}}`;
  return API;
};

export const getAttractionByIdAPI = (id: number) => {
  const API = `${HOSTNAME}/api/attractions/${id}`;
  return API;
};

export const getAttractionsByPlanIdAPI = (id: string) => {
  const API = `${HOSTNAME}/api/attractions/plan/${id}`;
  return API;
};

export const getAttractionById = async (id: number): Promise<Attraction | undefined> => {
  const API = getAttractionByIdAPI(id);
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
  return data as Attraction;
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

const replaceItemAtIndex = (array: Plan['days'], index: number, newValue: Plan['days'][number]): Plan['days'] => {
  return [...array.slice(0, index), newValue, ...array.slice(index + 1)];
};

export const addInterestToDayInsidePlan = (interest: Interest, dayIndex: number, plan: Plan): Plan => {
  const currentInterests = plan?.days[dayIndex]?.interests;
  const daysWithNewInterest = replaceItemAtIndex(plan.days, dayIndex, {
    ...plan.days[dayIndex],
    interests: currentInterests ? [...currentInterests, interest] : [interest],
  });
  const sortedInterests = daysWithNewInterest?.[dayIndex].interests?.sort((a, b) => {
    const aStart = Number(a.startTime.replace(':', '')) || 0;
    const bStart = Number(b.startTime.replace(':', '')) || 0;
    return aStart - bStart;
  });
  daysWithNewInterest[dayIndex].interests = sortedInterests;
  return { ...plan, days: daysWithNewInterest };
};

const removeInterestAtIndex = (array: Interest[], index: number) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const removeInterestFromDayInsidePlan = (attractionIndex: number, dayIndex: number, plan: Plan): Plan => {
  const currentInterests = plan?.days[dayIndex]?.interests;
  if (!currentInterests) return plan;
  const interestsWithoutDeletedItem = removeInterestAtIndex(currentInterests, attractionIndex);

  const daysWithoutInterest = replaceItemAtIndex(plan.days, dayIndex, {
    ...plan.days[dayIndex],
    interests: interestsWithoutDeletedItem,
  });

  return { ...plan, days: daysWithoutInterest };
};

const replaceInterestAtIndex = (array: Interest[], index: number, newValue: Interest) => {
  return [...array.slice(0, index), newValue, ...array.slice(index + 1)];
};

export const editInterestInsidePlan = (interest: Interest, attractionIndex: number, dayIndex: number, plan: Plan): Plan => {
  const currentInterests = plan?.days[dayIndex]?.interests;
  if (!currentInterests) return plan;
  const interestsWithEditedItem = replaceInterestAtIndex(currentInterests, attractionIndex, interest);
  const daysWithEditedInterest = replaceItemAtIndex(plan.days, dayIndex, {
    ...plan.days[dayIndex],
    interests: interestsWithEditedItem,
  });
  const sortedInterests = daysWithEditedInterest?.[dayIndex].interests?.sort((a, b) => {
    const aStart = Number(a.startTime.replace(':', '')) || 0;
    const bStart = Number(b.startTime.replace(':', '')) || 0;
    return aStart - bStart;
  });
  daysWithEditedInterest[dayIndex].interests = sortedInterests;

  return { ...plan, days: daysWithEditedInterest };
};

// const removeDayAtIndex = (array: Plan['days'], index: number) => {
//   return [...array.slice(0, index), ...array.slice(index + 1)];
// };

// export const removeDayInsidePlan = (dayIndex: number, plan: Plan): Plan => {
//   const daysWithoutInterest = removeDayAtIndex(plan.days, dayIndex);
//   return { ...plan, days: daysWithoutInterest };
// };
