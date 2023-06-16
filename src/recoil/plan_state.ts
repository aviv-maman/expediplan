'use client';
import { atom, DefaultValue, selectorFamily } from 'recoil';
import type { Plan } from '../../types/general';
import { getSession } from 'next-auth/react';
import { planListAPI } from './recoilAPI';
import { getPlansOfAuthenticatedUserFromServer } from '@/api/PlansAPI';

export const planListState = atom<Plan[] | undefined>({
  key: 'planList',
  default: [],
  effects: [
    ({ onSet, setSelf, trigger }) => {
      const isAuthenticated = async () => {
        const session = await getSession();
        return session?.user?.email ? true : false;
      };
      // If there's a persisted value - set it on load
      const loadPersisted = async () => {
        const auth = await isAuthenticated();
        const localList = window.localStorage.getItem('planList');
        const savedValue = auth ? await getPlansOfAuthenticatedUserFromServer() : localList ? (JSON.parse(localList) as Plan[]) : undefined;
        if (savedValue != null) {
          setSelf(savedValue);
        }
        console.log('loadPersisted', savedValue);
      };

      // Asynchronously set the persisted data
      if (trigger === 'get') {
        loadPersisted();
        console.log('trigger');
      }

      // Subscribe to state changes and persist them to localForage
      onSet((newValue, _, isReset) => {
        isReset ? window.localStorage.removeItem('planList') : window.localStorage.setItem('planList', JSON.stringify(newValue));
      });
    },
  ],
});

const replaceItemAtIndex = (array: Plan[], index: number, newValue: Plan) => {
  return [...array.slice(0, index), newValue, ...array.slice(index + 1)];
};

export const planSelectorFamily = selectorFamily<Plan | undefined, string>({
  key: 'plan',
  get:
    (id) =>
    async ({ get }) => {
      const isAuthenticated = get(authSelectorFamily(id));
      if (isAuthenticated) {
        const response = await planListAPI.getItem(Number(id));
        if (!response?.id) throw new Error('Failed to fetch plan');
        return response;
      } else {
        return get(planListState)?.find((plan) => plan.id === id);
      }
    },
  set:
    (id) =>
    async ({ get, set, reset }, newValue) => {
      const isAuthenticated = get(authSelectorFamily(id));
      set(planListState, (oldValue) => {
        if (oldValue && newValue) {
          const index = oldValue.findIndex((plan) => plan.id === id);
          if (index !== -1) {
            if (newValue instanceof DefaultValue) return;
            if (isAuthenticated) {
              const res = planListAPI.updateItem(Number(id), newValue);
            }
            return replaceItemAtIndex(oldValue, index, newValue);
          }
        }
        return oldValue;
      });
    },
});

const removeItemAtIndex = (array: Plan[], index: number) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

const authSelectorFamily = selectorFamily({
  key: 'auth',
  get: (id) => async () => {
    const session = await getSession();
    if (!session?.user?.email) return false;
    return true;
  },
});
