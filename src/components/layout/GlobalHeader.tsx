'use client';

import { IconSemiLogo } from '@douyinfe/semi-icons';
import { Avatar, Button, Dropdown, Layout, Nav } from '@douyinfe/semi-ui';
import { IconBell, IconHelp, IconHome, IconLivePhoto, IconSettings } from '@tabler/icons-react';
import { HeaderColorSchemeToggle } from './HeaderColorSchemeToggle';

const GlobalHeader: React.FC = () => {
  const { Header } = Layout;

  return (
    <Header style={{ marginBottom: '20px' }}>
      <div className='hide-sm'>
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

      <div className='hide-xs'>
        <Nav mode='horizontal' defaultSelectedKeys={['Home']}>
          <Nav.Header>
            <IconSemiLogo style={{ fontSize: 24 }} />
          </Nav.Header>
          <Nav.Footer>
            <HeaderColorSchemeToggle />
            <Button
              theme='borderless'
              icon={<IconHelp />}
              style={{
                color: 'var(--semi-color-text-2)',
                marginRight: '12px',
              }}
            />
            <Dropdown
              trigger='click'
              position='bottomLeft'
              clickToHide={true}
              render={
                <Dropdown.Menu>
                  <Dropdown.Item>Detail</Dropdown.Item>
                  <Dropdown.Item>Quit</Dropdown.Item>
                </Dropdown.Menu>
              }>
              <Avatar size='small' color='light-blue'>
                BD
              </Avatar>
            </Dropdown>
          </Nav.Footer>
        </Nav>
      </div>
    </Header>
  );
};

export default GlobalHeader;
