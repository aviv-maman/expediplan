'use client';
import { RecoilRoot } from 'recoil';
import { useEffect, useState } from 'react';

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
