'use client';
import { RecoilRoot, atom, atomFamily, selectorFamily } from 'recoil';
import type { Plan } from '../../types/general';
import { useEffect, useState } from 'react';

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

// const planSelectorFamily = selectorFamily({
//   key: 'plan',
//   get: (id: number) => async () => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/plans/${id}`);
//     if (!res.ok) {
//       throw new Error('Failed to fetch plan');
//     }
//     return (await res.json()) as Plan;
//   },
// });

///////////////////////////////////////////////////////////////////////////////////////////

// export const planIds = atom<string[]>({
//   key: 'ids',
//   default: [],
//   effects: [
//     ({ onSet, setSelf, node }) => {
//       const savedValue = localStorage.getItem(node.key);
//       if (savedValue != null) {
//         const itemsIds = JSON.parse(savedValue).map((item: Plan) => item.id) as string[];
//         setSelf(itemsIds);
//       }
//       onSet((newValue, _, isReset) => {
//         isReset ? localStorage.removeItem(node.key) : localStorage.setItem(node.key, JSON.stringify(newValue));
//       });
//     },
//   ],
// });

// export const planState = atomFamily<Plan, number>({
//   key: 'plan',
//   default: {} as Plan,
//   effects: [
//     ({ onSet, setSelf, node }) => {
//       const savedValue = localStorage.getItem(node.key);
//       if (savedValue != null) {
//         setSelf(JSON.parse(savedValue));
//       }
//       onSet((newValue, _, isReset) => {
//         isReset ? localStorage.removeItem(node.key) : localStorage.setItem(node.key, JSON.stringify(newValue));
//       });
//     },
//   ],
// });

const GlobalRecoilRoot: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windowInitialized, setWindowInitialized] = useState(false);

  useEffect(() => {
    setWindowInitialized(true);
  }, []);

  if (!windowInitialized) {
    return null;
  }

  return <RecoilRoot>{children}</RecoilRoot>;
};

export default GlobalRecoilRoot;
