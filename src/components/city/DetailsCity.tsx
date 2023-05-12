'use client';
import { createStyles, Title, Text, Container, rem, Stack, Group, Button } from '@mantine/core';
import type { City } from '../../../types/general';
import Link from 'next/link';
import useSWR from 'swr';
import { attractionsFetcher, getAttractionsByCityIdAPI } from '@/api/AttractionsAPI';
import { CATEGORIES_IN_CITY_PAGE } from '@/constants';
import CardsCarousel from '../CardsCarousel';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(24),
    },
  },

  subtitle: {
    fontSize: rem(20),
    fontWeight: 800,
    [theme.fn.gradient()]: { from: 'green', to: 'orange' },
  },

  description: {
    margin: 'auto',
    textAlign: 'left',

    '&::after': {
      content: '""',
      display: 'block',
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  card: {
    border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]}`,
  },

  cardTitle: {
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}));

interface DetailsCityProps {
  city?: City;
}

const DetailsCity: React.FC<DetailsCityProps> = ({ city }) => {
  const { classes } = useStyles();
  const attractions = useSWR(getAttractionsByCityIdAPI(Number(city?.id), CATEGORIES_IN_CITY_PAGE), attractionsFetcher, { suspense: true });

  if (attractions?.isLoading) return <div>Loading...</div>;

  return (
    <Container size='lg' id='details-city' px={0}>
      <Stack align='center'>
        <Title className={classes.title}>About {city?.name}</Title>
        <Text c='dimmed' className={classes.description} ta='center'>
          {city?.about}
        </Text>
      </Stack>

      <Group position='center'>
        <Button variant='light' size='sm'>
          Explore {city?.country_name}
        </Button>
        <Link href={{ pathname: `https://www.wikidata.org/wiki/${city?.wikiDataId}` }} target='_blank' rel='noopener noreferrer'>
          <Button variant='light' size='sm'>
            Wiki
          </Button>
        </Link>
      </Group>

      <Title className={classes.title} ta='center' mt='sm'>
        What to do in {city?.name}
      </Title>
      <Text c='dimmed' className={classes.description} ta='center' mt='sm'>
        Explore the best places to visit in {city?.name}
      </Text>

      <Text my='xs' className={classes.subtitle} variant='gradient'>
        Historical Sites
      </Text>
      <CardsCarousel data={attractions?.data} />

      <Text my='xs' className={classes.subtitle} variant='gradient'>
        Restaurants
      </Text>
      <CardsCarousel data={attractions?.data} />

      <Text my='xs' className={classes.subtitle} variant='gradient'>
        Shopping
      </Text>
      <CardsCarousel data={attractions?.data} />
    </Container>
  );
};

export default DetailsCity;