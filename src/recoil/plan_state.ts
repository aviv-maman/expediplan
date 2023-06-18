'use client';
import { atom, DefaultValue, selector, selectorFamily } from 'recoil';
import type { Plan } from '../../types/general';
import { planListAPI } from './recoilAPI';

export const planListState = atom<Plan[] | undefined>({
  key: 'planList',
  default: selector({
    key: 'planList/initial',
    get: async () => {
      const isAuthenticated = await planListAPI.isAuthenticated();
      const savedValue = window.localStorage.getItem('planList');
      const localList = savedValue ? (JSON.parse(savedValue) as Plan[]) : undefined;
      return isAuthenticated ? await planListAPI.getItems() : localList;
    },
  }),
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

type ActionType = 'create' | 'edit' | 'delete';

export const planSelectorFamily = selectorFamily<Plan | undefined, { id: string; action?: ActionType }>({
  key: 'plan',
  get:
    ({ id }) =>
    async ({ get }) => {
      const isAuthenticated = await planListAPI.isAuthenticated();
      if (isAuthenticated) {
        const response = await planListAPI.getItem(Number(id));
        if (!response?.id) throw new Error('Failed to fetch plan');
        return response;
      } else {
        return get(planListState)?.find((plan) => plan.id === id);
      }
    },
  set:
    ({ id, action }) =>
    ({ get, set, reset }, newValue) => {
      if (newValue instanceof DefaultValue || !newValue) return;

      switch (action) {
        case 'create':
          planListAPI.createItem(newValue);
          break;
        case 'edit':
          planListAPI.editItem(Number(id), newValue);
          break;
        case 'delete':
          planListAPI.deleteItem(Number(id));
          break;
        default:
          break;
      }

      set(planListState, (prevState) => {
        if (prevState && newValue) {
          const index = prevState.findIndex((plan) => plan.id === id);
          if (index !== -1) {
            if (newValue instanceof DefaultValue) return;
            return action === 'delete' ? removeItemAtIndex(prevState, index) : replaceItemAtIndex(prevState, index, newValue);
          }
        }
        return prevState;
      });
    },
});

const replaceItemAtIndex = (array: Plan[], index: number, newValue: Plan) => {
  return [...array.slice(0, index), newValue, ...array.slice(index + 1)];
};

const removeItemAtIndex = (array: Plan[], index: number) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};
