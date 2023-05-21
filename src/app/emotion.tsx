'use client';
import { CacheProvider } from '@emotion/react';
import { useEmotionCache, MantineProvider, ColorSchemeProvider, type ColorScheme } from '@mantine/core';
import { useServerInsertedHTML } from 'next/navigation';
import { Notifications } from '@mantine/notifications';
import { useColorScheme } from '@mantine/hooks';
import { useRecoilState } from 'recoil';
import { colorSchemeAtom } from '@/recoil/settings_state';
import { useEffect } from 'react';

export default function RootStyleRegistry({ children, colorSchemeCookie }: { children: React.ReactNode; colorSchemeCookie: ColorScheme }) {
  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' '),
      }}
      key={cache.key} //React needs a key to know when to re-render
    />
  ));

  const preferredColorScheme = useColorScheme(colorSchemeCookie);
  const [colorScheme, setColorScheme] = useRecoilState(colorSchemeAtom);

  useEffect(() => {
    setColorScheme(preferredColorScheme);
  }, []);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
  };

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS emotionCache={cache}>
        <CacheProvider value={cache}>
          {children}
          <Notifications />
        </CacheProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
