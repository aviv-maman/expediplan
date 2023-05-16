'use client';
import { Grid, SimpleGrid, useMantineTheme, rem, Container, Image, Text } from '@mantine/core';
import type { City } from '../../../types/general';

const PRIMARY_COL_HEIGHT = rem(300);

interface LeadGridProps {
  city?: City;
}

const LeadGrid: React.FC<LeadGridProps> = ({ city }) => {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

  return (
    <Container size='2xl' id='details-city' px={0} mx={0}>
      <Text my='xs' fw={'800'} sx={{ display: 'flex', justifyContent: 'center', fontSize: '1.5rem' }}>
        Gallery of {city?.name}
      </Text>
      <SimpleGrid cols={2} spacing='md' breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Image
          src={city?.images?.[0]}
          alt={city?.name}
          height={PRIMARY_COL_HEIGHT}
          radius='md'
          withPlaceholder
          sx={{ border: theme.colorScheme === 'dark' ? '1px solid #787878' : '1px solid #dee2e6', borderRadius: '6px' }}
        />
        <Grid>
          <Grid.Col>
            <Image
              src={city?.images?.[1]}
              alt={city?.name}
              height={SECONDARY_COL_HEIGHT}
              radius='md'
              withPlaceholder
              sx={{ border: theme.colorScheme === 'dark' ? '1px solid #787878' : '1px solid #dee2e6', borderRadius: '6px' }}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Image
              src={city?.images?.[2]}
              alt={city?.name}
              height={SECONDARY_COL_HEIGHT}
              radius='md'
              withPlaceholder
              sx={{ border: theme.colorScheme === 'dark' ? '1px solid #787878' : '1px solid #dee2e6', borderRadius: '6px' }}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Image
              src={city?.images?.[3]}
              alt={city?.name}
              height={SECONDARY_COL_HEIGHT}
              radius='md'
              withPlaceholder
              sx={{ border: theme.colorScheme === 'dark' ? '1px solid #787878' : '1px solid #dee2e6', borderRadius: '6px' }}
            />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
};

export default LeadGrid;
