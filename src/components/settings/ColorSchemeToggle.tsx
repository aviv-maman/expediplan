'use client';
import { Group, Switch, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export function ColorSchemeToggle({ classes }: { classes: { item: string; switch: string } }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  return (
    <Group position='apart' className={classes.item} noWrap spacing='xl'>
      <div>
        <Text>Dark Mode</Text>
        <Text size='xs' color='dimmed'>
          Enable dark mode across the website
        </Text>
      </div>
      <Switch
        checked={colorScheme === 'dark'}
        onChange={() => toggleColorScheme()}
        size='lg'
        onLabel={<IconSun color={theme.white} size='1.1rem' />}
        offLabel={<IconMoonStars color={theme.colors.gray[6]} size='1.1rem' />}
        className={classes.switch}
      />
    </Group>
  );
}
