'use client';
import { Grid, SimpleGrid, Skeleton, useMantineTheme, rem, Container, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const PRIMARY_COL_HEIGHT = rem(300);

interface LeadGridSkeletonProps {}

const LeadGridSkeleton: React.FC<LeadGridSkeletonProps> = ({}) => {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  const tablet = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  return (
    <Container size='xl' id='details-city' px={0} mx={0}>
      <Text my='xs' fw={'800'} sx={{ display: 'flex', justifyContent: 'center', fontSize: '1.5rem' }}>
        Gallery
      </Text>
      <SimpleGrid cols={2} spacing='md' breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Skeleton height={PRIMARY_COL_HEIGHT} radius='md' width={mobile ? '356px' : tablet ? '696px' : '560px'} />
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
