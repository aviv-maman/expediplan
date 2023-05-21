'use client';
import { CacheProvider } from '@emotion/react';
import { useEmotionCache, MantineProvider, ColorSchemeProvider, type ColorScheme } from '@mantine/core';
import { useServerInsertedHTML } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { Notifications } from '@mantine/notifications';
import { useState } from 'react';
import { useColorScheme } from '@mantine/hooks';

export default function RootStyleRegistry({ children, themeColor }: { children: React.ReactNode; themeColor: ColorScheme }) {
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

  const preferredColorScheme = useColorScheme(themeColor);
  const [colorScheme, setColorScheme] = useState<ColorScheme>(preferredColorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setCookie('color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
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
