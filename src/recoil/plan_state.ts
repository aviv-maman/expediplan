'use client';
import { atom, DefaultValue, selector, selectorFamily } from 'recoil';
import type { Plan } from '../../types/general';
import { planListAPI } from './recoilAPI';

export const planListState = atom<Plan[] | undefined>({
  key: 'planList',
  default: selector({
    key: 'planList/initial',
    get: async () => {
      return await planListAPI.getItems();
    },
  }),
  effects: [
    ({ onSet, setSelf }) => {
      const savedValue = window.localStorage.getItem('planList');
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
      onSet((newValue, _, isReset) => {
        isReset && window.localStorage.removeItem('planList');
      });
    },
  ],
});

type ActionType = { id: undefined; action: 'create' } | { id: string; action: 'edit' | 'delete' };

export const planSelectorFamily = selectorFamily<Plan | undefined, ActionType>({
  key: 'plan',
  get:
    ({ id }) =>
    async ({ get }) => {
      if (!id) return;
      return await planListAPI.getItem(id);
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
          planListAPI.editItem(id, newValue);
          break;
        case 'delete':
          planListAPI.deleteItem(id);
          break;
        default:
          break;
      }

      set(planListState, (prevState) => {
        if (prevState && newValue) {
          if (action === 'create') return [...prevState, newValue];
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
