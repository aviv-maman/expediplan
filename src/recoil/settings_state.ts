'use client';
import { atom } from 'recoil';
import { type ColorScheme } from '@mantine/core';

export const temperatureUnitAtom = atom<'c' | 'f'>({
  key: 'temperatureUnit',
  default: 'c',
});

export const colorSchemeAtom = atom<ColorScheme>({
  key: 'colorScheme',
  default: 'light',
});
