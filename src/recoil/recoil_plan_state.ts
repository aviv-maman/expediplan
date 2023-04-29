'use client';
import { atom, selectorFamily } from 'recoil';
import type { Plan } from '../../types/general';

export const planListState = atom<Plan[]>({
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

export const planSelectorFamily = selectorFamily({
  key: 'plan',
  get:
    (id: string) =>
    async ({ get }) => {
      const planList = get(planListState);
      const plan = planList.find((plan) => plan.id === id);
      return plan;
    },
});
