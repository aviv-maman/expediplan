'use client';
import { atom, DefaultValue, selectorFamily } from 'recoil';
import type { Plan } from '../../types/general';

export const planListState = atom<Plan[] | undefined>({
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
      const planList = get(planListState);
      const plan = planList?.find((plan) => plan.id === id);
      return plan;
    },
  set:
    (id) =>
    ({ set }, newValue) => {
      set(planListState, (oldValue) => {
        if (oldValue && newValue) {
          const index = oldValue.findIndex((plan) => plan.id === id);
          if (index !== -1) {
            if (newValue instanceof DefaultValue) return;
            return replaceItemAtIndex(oldValue, index, newValue);
          }
        }
        return oldValue;
      });
    },
});
