'use client';

import { IconHelpCircle, IconSemiLogo } from '@douyinfe/semi-icons';
import { Avatar, Button, Dropdown, Layout, Nav } from '@douyinfe/semi-ui';
import { HeaderColorSchemeToggle } from './HeaderColorSchemeToggle';

const GlobalHeader: React.FC = () => {
  const { Header } = Layout;

  return (
    <Header style={{ marginBottom: '20px' }}>
      <div className='hide-md'>
        <Nav mode='horizontal' defaultSelectedKeys={['Home']}>
          <Nav.Header>
            <IconSemiLogo style={{ fontSize: 24 }} />
          </Nav.Header>
          <Nav.Footer>
            <HeaderColorSchemeToggle />
            <Button
              theme='borderless'
              icon={<IconHelpCircle />}
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
