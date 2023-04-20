'use client';

import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export function HeaderColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

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
    <ActionIcon
      variant='default'
      onClick={() => toggleColorScheme()}
      size='lg'
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
      })}>
      {colorScheme === 'dark' ? <IconSun /> : <IconMoonStars />}
    </ActionIcon>
  );
}
