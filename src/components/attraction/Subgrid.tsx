'use client';
import { SimpleGrid, Skeleton, Container, Stack, useMantineTheme, px } from '@mantine/core';

const BASE_HEIGHT = 360;

const Subgrid: React.FC = () => {
  const theme = useMantineTheme();
  const getChild = (height: number) => (
    <Skeleton
      height={height}
      radius='md'
      animate={false}
      sx={{ border: theme.colorScheme === 'dark' ? '1px solid #787878' : '1px solid #dee2e6', borderRadius: '6px' }}
    />
  );
  const getSubHeight = (children: number, spacing: number) => BASE_HEIGHT / children - spacing * ((children - 1) / children);

  return (
    <Container id='subgrid-container' w={'100%'}>
      <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'xs', cols: 1 }]} mb={'md'}>
        {getChild(BASE_HEIGHT)}
        <Stack>
          {getChild(getSubHeight(2, px(theme.spacing.md)))}
          {getChild(getSubHeight(2, px(theme.spacing.md)))}
        </Stack>
        <Stack>
          {getChild(getSubHeight(3, px(theme.spacing.md)))}
          {getChild(getSubHeight(3, px(theme.spacing.md)))}
          {getChild(getSubHeight(3, px(theme.spacing.md)))}
        </Stack>
        {getChild(BASE_HEIGHT)}
      </SimpleGrid>
      <Skeleton
        height={360}
        radius='md'
        animate={false}
        sx={{ border: theme.colorScheme === 'dark' ? '1px solid #787878' : '1px solid #dee2e6', borderRadius: '6px' }}
      />
    </Container>
  );
};

export default Subgrid;
