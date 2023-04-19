'use client';

import { IconBell, IconHelpCircle } from '@douyinfe/semi-icons';
import { Button, Layout, Nav } from '@douyinfe/semi-ui';

const GlobalFooter: React.FC = () => {
  const { Footer } = Layout;

  return (
    <Footer
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
        color: 'var(--semi-color-text-2)',
        backgroundColor: 'rgba(var(--semi-grey-0), 1)',
      }}>
      <Nav mode='horizontal' defaultSelectedKeys={['Home']} style={{ borderBottom: 0, borderTop: '1px solid var(--semi-color-border)' }}>
        <Nav.Footer>
          <Button
            theme='borderless'
            icon={<IconBell size='large' />}
            style={{
              color: 'var(--semi-color-text-2)',
              marginRight: '12px',
            }}
          />
          <Button
            theme='borderless'
            icon={<IconHelpCircle size='large' />}
            style={{
              color: 'var(--semi-color-text-2)',
              marginRight: '12px',
            }}
          />
        </Nav.Footer>
      </Nav>
    </Footer>
  );
};

export default GlobalFooter;
