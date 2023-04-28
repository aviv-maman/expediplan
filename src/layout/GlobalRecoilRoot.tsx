'use client';
import { RecoilRoot, atom } from 'recoil';
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
