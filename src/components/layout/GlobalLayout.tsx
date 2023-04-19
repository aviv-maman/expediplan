'use client';

import { Layout } from '@douyinfe/semi-ui';

const GlobalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout hasSider={false} style={{ minHeight: '100vh' }}>
      {children}
    </Layout>
  );
};

export default GlobalLayout;
