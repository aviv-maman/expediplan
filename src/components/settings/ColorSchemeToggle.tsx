'use client';
import { updateWebsiteSettings } from '@/api/UpdateSettings';
import { colorSchemeAtom } from '@/recoil/settings_state';
import { Group, Switch, Text } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export function ColorSchemeToggle({ classes }: { classes?: { item: string; switch: string } }) {
  const [colorScheme, setColorScheme] = useRecoilState(colorSchemeAtom);

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  const handleColorSchemeChange = () => {
    setColorScheme((currentValue) => (currentValue === 'dark' ? 'light' : 'dark'));
    updateWebsiteSettings({ theme: colorScheme === 'dark' ? 'light' : 'dark' });
  };

  return (
    <Group position='apart' className={classes?.item} noWrap spacing='xl'>
      <div>
        <Text>Dark Mode</Text>
        <Text size='xs' color='dimmed'>
          Enable dark mode across the website
        </Text>
      </div>
      <Switch
        checked={colorScheme === 'dark'}
        onChange={handleColorSchemeChange}
        size='lg'
        onLabel={<IconSun color={'white'} size='1.1rem' />}
        offLabel={<IconMoonStars color={'#868E96'} size='1.1rem' />}
        className={classes?.switch}
      />
    </Group>
  );
}
