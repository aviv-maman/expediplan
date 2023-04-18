'use client';

import { Avatar, Button, Layout, Nav } from '@douyinfe/semi-ui';
import { IconBell, IconHelp, IconHome, IconLivePhoto, IconSettings } from '@tabler/icons-react';

interface GlobalHeaderProps {}

const GlobalHeader: React.FC<GlobalHeaderProps> = ({}) => {
  const { Header } = Layout;

  return (
    <Header>
      <div>
        <Nav mode='horizontal' defaultSelectedKeys={['Home']}>
          <Nav.Header>{/* <IconSemiLogo style={{ fontSize: 36 }} /> */}</Nav.Header>
          <Nav.Item itemKey='Home' text='Home' icon={<IconHome />} />
          <Nav.Item itemKey='Live' text='Live' icon={<IconLivePhoto />} />
          <Nav.Item itemKey='Setting' text='Setting' icon={<IconSettings />} />
          <Nav.Footer>
            <Button
              theme='borderless'
              icon={<IconBell />}
              style={{
                color: 'var(--semi-color-text-2)',
                marginRight: '12px',
              }}
            />
            <Button
              theme='borderless'
              icon={<IconHelp />}
              style={{
                color: 'var(--semi-color-text-2)',
                marginRight: '12px',
              }}
            />
            <Avatar color='orange' size='small'>
              YJ
            </Avatar>
          </Nav.Footer>
        </Nav>
      </div>
    </Header>
  );
};

export default GlobalHeader;
