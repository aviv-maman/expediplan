'use client';
import { RecoilRoot, atom, atomFamily } from 'recoil';
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

// const idsState = atom<string[]>({
//   key: 'itemsIds',
//   default: [],
//   effects: [
//     ({ setSelf }) => {
//       const savedValue = window.localStorage.getItem('planList');
//       if (savedValue != null) {
//         const itemsIds = JSON.parse(savedValue).map((item: Plan) => item.id) as string[];
//         setSelf(itemsIds); //set initial value of the atom to the promise
//       }
//     },
//   ],
// });

const itemsIds = atom<string[]>({
  key: 'ids',
  default: [],
  effects: [
    ({ onSet, setSelf, node }) => {
      const savedValue = localStorage.getItem(node.key);
      if (savedValue != null) {
        const itemsIds = JSON.parse(savedValue).map((item: Plan) => item.id) as string[];
        setSelf(itemsIds);
      }
      onSet((newValue, _, isReset) => {
        isReset ? localStorage.removeItem(node.key) : localStorage.setItem(node.key, JSON.stringify(newValue));
      });
    },
  ],
});

const itemState = atomFamily<Plan, string>({
  key: 'item',
  default: {} as Plan,
  effects: [
    ({ onSet, setSelf, node }) => {
      const savedValue = localStorage.getItem(node.key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
      onSet((newValue, _, isReset) => {
        isReset ? localStorage.removeItem(node.key) : localStorage.setItem(node.key, JSON.stringify(newValue));
      });
    },
  ],
});

// const itemWithId = memoize((id: string) => atom<Plan | undefined>({ key: `plan-${id}`, default: undefined }));

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
