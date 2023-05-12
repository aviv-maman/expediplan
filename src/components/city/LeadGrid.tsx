'use client';
import { Grid, SimpleGrid, Skeleton, useMantineTheme, rem, Container, Image, Text } from '@mantine/core';
import type { City } from '../../../types/general';
import { useMediaQuery } from '@mantine/hooks';

const PRIMARY_COL_HEIGHT = rem(300);

interface LeadGridProps {
  city?: City;
  skeleton?: boolean;
}

const LeadGrid: React.FC<LeadGridProps> = ({ city, skeleton }) => {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  const tablet = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  return (
    <Container size='lg' id='details-city' px={0}>
      <Text my='xs' fw={'800'} sx={{ display: 'flex', justifyContent: 'center', fontSize: '1.5rem' }}>
        Gallery
      </Text>
      <SimpleGrid cols={2} spacing='md' breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {skeleton && <Skeleton height={PRIMARY_COL_HEIGHT} radius='md' />}
        <Image
          width={mobile ? '356px' : tablet ? '696px' : '560px'}
          src={city?.images?.[0]}
          alt={city?.name}
          height={PRIMARY_COL_HEIGHT}
          radius='md'
          withPlaceholder
          sx={{ border: '1px solid #dee2e6', borderRadius: '6px' }}
        />
        <Grid gutter='md'>
          <Grid.Col>
            {skeleton && <Skeleton height={SECONDARY_COL_HEIGHT} radius='md' />}
            <Image
              src={city?.images?.[1]}
              alt={city?.name}
              height={SECONDARY_COL_HEIGHT}
              radius='md'
              withPlaceholder
              sx={{ border: '1px solid #dee2e6', borderRadius: '6px' }}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            {skeleton && <Skeleton height={SECONDARY_COL_HEIGHT} radius='md' />}
            <Image
              src={city?.images?.[2]}
              alt={city?.name}
              height={SECONDARY_COL_HEIGHT}
              radius='md'
              withPlaceholder
              sx={{ border: '1px solid #dee2e6', borderRadius: '6px' }}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            {skeleton && <Skeleton height={SECONDARY_COL_HEIGHT} radius='md' />}
            <Image
              src={city?.images?.[3]}
              alt={city?.name}
              height={SECONDARY_COL_HEIGHT}
              radius='md'
              withPlaceholder
              sx={{ border: '1px solid #dee2e6', borderRadius: '6px' }}
            />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
};

export default LeadGrid;
