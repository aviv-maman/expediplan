'use client';

import { Button } from '@douyinfe/semi-ui';
import { IconMoon, IconSun } from '@douyinfe/semi-icons';
import { getCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

export function HeaderColorSchemeToggle() {
  const [isDark, setIsDark] = useState<'light' | 'dark'>(getCookie('semi-color-scheme') === 'dark' ? 'dark' : 'light');
  const toggleColorScheme = () => {
    const body = document?.body;
    if (body) {
      body.removeAttribute('theme-mode');
      body.setAttribute('theme-mode', isDark === 'dark' ? 'light' : 'dark');
    }
    setCookie('semi-color-scheme', isDark === 'dark' ? 'light' : 'dark');
    setIsDark((prevState) => (prevState === 'light' ? 'dark' : 'light'));
  };

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    // This forces a rerender, so the date is rendered
    // the second time but not the first
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  return (
    <Button
      onClick={toggleColorScheme}
      theme='borderless'
      icon={isDark === 'dark' ? <IconSun /> : <IconMoon />}
      style={{
        color: 'var(--semi-color-text-2)',
        marginRight: '12px',
      }}
    />
  );
}
