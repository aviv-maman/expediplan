'use client';
import { Skeleton } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export default function WeatherLoading() {
  const mobile = useMediaQuery('(max-width: 36em)');

  return <Skeleton height={mobile ? 349 : 305} />;
}
