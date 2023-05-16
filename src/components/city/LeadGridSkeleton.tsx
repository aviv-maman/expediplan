'use client';
import { Grid, SimpleGrid, Skeleton, useMantineTheme, rem, Container } from '@mantine/core';

const PRIMARY_COL_HEIGHT = rem(300);

interface LeadGridSkeletonProps {}

const LeadGridSkeleton: React.FC<LeadGridSkeletonProps> = ({}) => {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

  return (
    <Container size='2xl' id='details-city-sk' px={0} mx={0}>
      <Skeleton my='xs' radius='md' height={36} />
      <SimpleGrid cols={2} spacing='md' breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Skeleton height={PRIMARY_COL_HEIGHT} radius='md' />
        <Grid>
          <Grid.Col>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius='md' />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius='md' />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius='md' />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
};

export default LeadGridSkeleton;
