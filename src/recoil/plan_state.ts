'use client';
import { atom, atomFamily, DefaultValue, selector, selectorFamily } from 'recoil';
import type { Plan } from '../../types/general';
import { getSession } from 'next-auth/react';
import { planListAPI } from './recoilAPI';

const localPlanListState = atom<Plan[] | undefined>({
  key: 'planList',
  default: [],
  effects: [
    ({ onSet, setSelf }) => {
      const savedValue = window.localStorage.getItem('planList');
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
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
      const auth = get(authSelector);
      if (await auth()) {
        const response = await planListAPI.getItem(Number(id));
        if (!response?.id) throw new Error('Failed to fetch plan');
        return response;
      } else {
        return get(localPlanListState)?.find((plan) => plan.id === id);
      }
    },
  set:
    (id) =>
    async ({ get, set, reset }, newValue) => {
      const auth = get(authSelector);
      const isAuth = await auth();
      set(localPlanListState, (oldValue) => {
        if (oldValue && newValue) {
          const index = oldValue.findIndex((plan) => plan.id === id);
          if (index !== -1) {
            if (newValue instanceof DefaultValue) return;
            if (isAuth) {
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

const authSelector = selector({
  key: 'auth',
  get: () => async () => {
    const session = await getSession();
    return session?.user?.email ? true : false;
  },
});

export const remoteOrLocalPlanList = selector<Plan[] | undefined>({
  key: 'currentPlanList',
  get: async ({ get }) => {
    const auth = get(authSelector);
    return (await auth()) ? await planListAPI.getItems() : get(localPlanListState);
  },
});

export const deleteOrCreatePlanState = atomFamily<Plan | undefined, string>({
  key: 'item',
  default: undefined,
  effects: (id) => [
    ({ onSet, trigger }) => {
      onSet((newValue, oldValue, isReset) => {
        if (oldValue instanceof DefaultValue && trigger === 'get') return;
        if (isReset) {
          planListAPI.deleteItem(Number(id));
        } else {
          if (!newValue) return;
          planListAPI.createItem(newValue);
        }
      });
    },
  ],
});
