import type { Plan } from '../../types/general';
import { HOSTNAME } from '@/lib/constants';

export const plansFetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<Plan[]>);
export const planFetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<Plan>);

export const getPlansAPI = (ids?: number | number[]) => {
  const params = new URLSearchParams(ids ? { id: String(ids) } : undefined);
  const API = `${HOSTNAME}/api/plans?${params}`;
  return API;
};

export const getPlanByIdAPI = (id: number) => {
  const API = `${HOSTNAME}/api/plans/${id}`;
  return API;
};

//For server side rendering
export const getPlanByIdFromServer = async (id: number): Promise<Plan | undefined> => {
  // const TOKEN = 'token';
  const API = getPlanByIdAPI(id);
  const res = await fetch(API, {
    // headers: { Authorization: `token ${TOKEN}` },
    cache: 'no-cache',
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
  return data as Plan;
};

export const getPlanByIdFromLocalStorage = (id: string) => {
  const savedValue = window.localStorage.getItem('planList');
  const plans = savedValue ? (JSON.parse(savedValue) as Plan[]) : [];
  return plans.find((plan) => plan.id === id);
};

export const getPlansFromLocalStorage = () => {
  const savedValue = window.localStorage.getItem('planList');
  return savedValue ? (JSON.parse(savedValue) as Plan[]) : [];
};

export const uploadPlanToServer = async (plan: Plan) => {
  const API = `${HOSTNAME}/api/plans`;
  const res = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY || '',
    },
    body: JSON.stringify(plan),
  });
  if (!res.ok) {
    throw new Error('Failed to upload plan');
  }
  const data = await res.json();
  return data as Plan | undefined;
};

export const savePlanToLocalStorage = (plan: Plan) => {
  const savedValue = window.localStorage.getItem('planList');
  const plans = savedValue ? (JSON.parse(savedValue) as Plan[]) : [];
  const newValue = plans ? [...plans, plan] : [plan];
  window.localStorage.setItem('planList', JSON.stringify(newValue));
};

export const getPlansOfUserFromServer = async () => {
  const API = `${HOSTNAME}/api/plans`;
  const res = await fetch(API, {
    // headers: { Authorization: `token ${TOKEN}` },
    // cache: 'no-cache',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  return data as Plan[] | undefined;
};

export const deletePlanFromServer = async (id: number) => {
  const API = `${HOSTNAME}/api/plans/${id}`;
  const res = await fetch(API, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY || '',
    },
  });
  if (!res.ok) {
    throw new Error('Failed to delete plan');
  }
  const data = await res.json();
  return data as Plan | undefined;
};

export const deletePlanFromLocalStorage = (id: string) => {
  const savedValue = window.localStorage.getItem('planList');
  const plans = savedValue ? (JSON.parse(savedValue) as Plan[]) : [];
  const newValue = plans.filter((plan) => plan.id !== id);
  window.localStorage.setItem('planList', JSON.stringify(newValue));
};

type PatchableKeys = { name: string };

export const editPlanOnServer = async (id: number, patchObj: PatchableKeys) => {
  const API = `${HOSTNAME}/api/plans/${id}`;
  const res = await fetch(API, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY || '',
    },
    body: JSON.stringify(patchObj),
  });
  if (!res.ok) {
    throw new Error('Failed to edit plan');
  }
  const data = await res.json();
  return data as Plan | undefined;
};

const replaceItemAtIndex = (array: Plan[], index: number, newValue: Plan) => {
  return [...array.slice(0, index), newValue, ...array.slice(index + 1)];
};

export const editPlanOnLocalStorage = (id: string, patchObj: PatchableKeys) => {
  const savedValue = window.localStorage.getItem('planList');
  const plans = savedValue ? (JSON.parse(savedValue) as Plan[]) : [];
  const index = plans.findIndex((plan) => plan.id === id);
  const plan = plans[index];
  const newPlan = { ...plan, ...patchObj };
  const newValue = replaceItemAtIndex(plans, index, newPlan);
  window.localStorage.setItem('planList', JSON.stringify(newValue));
};
