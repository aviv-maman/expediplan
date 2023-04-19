'use client';
import { IconHelpCircle, IconHome, IconList, IconUser } from '@douyinfe/semi-icons';
import { Button, Layout, Nav } from '@douyinfe/semi-ui';
import { HeaderColorSchemeToggle } from './HeaderColorSchemeToggle';

const GlobalFooter: React.FC = () => {
  const { Footer } = Layout;

  return (
    <div className='hide-xs'>
      <Footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px',
          color: 'var(--semi-color-text-2)',
          backgroundColor: 'rgba(var(--semi-grey-0), 1)',
        }}>
        <Nav mode='horizontal' defaultSelectedKeys={['Home']} style={{ borderBottom: 0, borderTop: '1px solid var(--semi-color-border)' }}>
          <Nav.Footer style={{ flex: 'auto', justifyContent: 'space-between', alignItems: 'center', padding: 0 }}>
            <Button
              theme='borderless'
              icon={<IconHome size='large' />}
              style={{
                color: 'var(--semi-color-text-2)',
              }}
            />
            <Button
              theme='borderless'
              icon={<IconList size='large' />}
              style={{
                color: 'var(--semi-color-text-2)',
              }}
            />
            <Button
              theme='borderless'
              icon={<IconUser size='large' />}
              style={{
                color: 'var(--semi-color-text-2)',
              }}
            />
            <HeaderColorSchemeToggle />
            <Button
              theme='borderless'
              icon={<IconHelpCircle size='large' />}
              style={{
                color: 'var(--semi-color-text-2)',
              }}
            />
          </Nav.Footer>
        </Nav>
      </Footer>
    </div>
  );
};

export default GlobalFooter;
