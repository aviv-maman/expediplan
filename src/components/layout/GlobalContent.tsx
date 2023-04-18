'use client';

import { Layout, Space } from '@douyinfe/semi-ui';

const GlobalContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { Content } = Layout;

  return (
    <Content className='global-container'>
      <Space align='center' vertical>
        {children}
      </Space>
    </Content>
  );
};

export default GlobalContent;
