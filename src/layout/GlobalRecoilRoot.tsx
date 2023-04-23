'use client';
import { RecoilRoot } from 'recoil';

const GlobalRecoilRoot: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default GlobalRecoilRoot;
