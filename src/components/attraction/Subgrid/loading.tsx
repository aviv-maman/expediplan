'use client';

import { Container, SimpleGrid, Skeleton, Stack, px, useMantineTheme } from '@mantine/core';
import { BASE_HEIGHT } from './Subgrid';

export default function Loading() {
  const theme = useMantineTheme();

  const getSubHeight = (children: number, spacing: number) => BASE_HEIGHT / children - spacing * ((children - 1) / children);
  const heightWithTwoChildren = getSubHeight(2, px(theme.spacing.md));
  const heightWithThreeChildren = getSubHeight(3, px(theme.spacing.md));

  return (
    <Container id='subgrid-container' w={'100%'}>
      <Skeleton height={36} radius='md' animate={false} />
      <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'xs', cols: 1 }]} mb={'md'}>
        <Skeleton height={BASE_HEIGHT} radius='md' />
        <Stack>
          <Skeleton height={heightWithTwoChildren} radius='md' />
          <Skeleton height={heightWithTwoChildren} radius='md' />
        </Stack>
        <Stack>
          <Skeleton height={heightWithThreeChildren} radius='md' />
          <Skeleton height={heightWithThreeChildren} radius='md' />
          <Skeleton height={heightWithThreeChildren} radius='md' />
        </Stack>
        <Skeleton height={BASE_HEIGHT} radius='md' />
      </SimpleGrid>
      <Skeleton height={360} radius='md' />
    </Container>
  );
}
