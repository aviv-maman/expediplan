'use client';

import { AppShell } from '@mantine/core';
import { HeaderResponsive } from './Header/HeaderResponsive';
import links from './Header/HeaderLinks';
import { FooterCentered } from './Footer/FooterCentered';
import footerProps from './Footer/footerProps';

const GlobalAppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppShell
      padding='md'
      // header={<HeaderResponsive links={links} />}
      footer={<FooterCentered links={footerProps.links} />}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}>
      {children}
    </AppShell>
  );
};

export default GlobalAppShell;
