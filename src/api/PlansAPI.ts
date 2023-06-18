import type { Plan } from '../../types/general';
import { HOSTNAME } from '@/lib/constants';

export const getPlanByIdFromServer = async (id: number): Promise<Plan | undefined> => {
  // const TOKEN = 'token';
  const API = `${HOSTNAME}/api/plans/${id}`;
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

//In use by getAttractionsByPlanIdFromLocalStorage
export const getPlanByIdFromLocalStorage = (id: string) => {
  const plans = JSON.parse(localStorage.getItem('planList') || '[]') as Plan[];
  const plan = plans.find((plan) => plan.id === id);
  return plan;
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

export const editPlanOnServer = async (id: number, plan: Plan) => {
  const API = `${HOSTNAME}/api/plans/${id}`;
  const res = await fetch(API, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY || '',
    },
    body: JSON.stringify(plan),
  });
  if (!res.ok) {
    throw new Error('Failed to edit plan');
  }
  const data = await res.json();
  return data as Plan | undefined;
};
