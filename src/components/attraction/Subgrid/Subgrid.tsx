'use client';
import { SimpleGrid, Skeleton, Container, Stack, useMantineTheme, px, createStyles, Title, rem } from '@mantine/core';
import type { Attraction } from '../../../../types/general';

export const BASE_HEIGHT = 360;

const useStyles = createStyles((theme) => ({
  skeleton: {
    border: theme.colorScheme === 'dark' ? '1px solid #787878' : '1px solid #dee2e6',
    borderRadius: '6px',
  },

  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(24),
    },
  },
}));

interface SubgridProps {
  attraction: string;
}

export const Subgrid: React.FC<SubgridProps> = ({ attraction }) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const getSubHeight = (children: number, spacing: number) => BASE_HEIGHT / children - spacing * ((children - 1) / children);
  const heightWithTwoChildren = getSubHeight(2, px(theme.spacing.md));
  const heightWithThreeChildren = getSubHeight(3, px(theme.spacing.md));

  const deserializedAttraction = JSON.parse(attraction) as Attraction;

  return (
    <Container id='subgrid-container' w={'100%'}>
      <Title
        order={2}
        className={classes.title}
        ta='center'
        mb='sm'
        variant='gradient'
        gradient={{ from: theme.colors.red[5], to: theme.colors.yellow[5], deg: 45 }}>
        {`${deserializedAttraction.name}, ${deserializedAttraction.address.city}`}
      </Title>
      <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'xs', cols: 1 }]} mb='md'>
        <Skeleton height={BASE_HEIGHT} radius='md' animate={false} className={classes.skeleton} />
        <Stack>
          <Skeleton height={heightWithTwoChildren} radius='md' animate={false} className={classes.skeleton} />
          <Skeleton height={heightWithTwoChildren} radius='md' animate={false} className={classes.skeleton} />
        </Stack>
        <Stack>
          <Skeleton height={heightWithThreeChildren} radius='md' animate={false} className={classes.skeleton} />
          <Skeleton height={heightWithThreeChildren} radius='md' animate={false} className={classes.skeleton} />
          <Skeleton height={heightWithThreeChildren} radius='md' animate={false} className={classes.skeleton} />
        </Stack>
        <Skeleton height={BASE_HEIGHT} radius='md' animate={false} className={classes.skeleton} />
      </SimpleGrid>
      <Skeleton height={360} radius='md' animate={false} className={classes.skeleton} />
    </Container>
  );
};
