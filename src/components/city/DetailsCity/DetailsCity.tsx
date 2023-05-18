'use client';
import { createStyles, Title, Text, rem, Stack, Group, Button } from '@mantine/core';
import type { City } from '../../../../types/general';
import Link from 'next/link';
import useSWR from 'swr';
import { attractionsFetcher, getAttractionsByCityIdAPI } from '@/api/AttractionsAPI';
import { CATEGORIES_IN_CITY_PAGE, CategoryName } from '@/constants';
import { filterAttractionsByCategory } from '@/helpers/processInfo';
import CarouselAttractions from '../CarouselAttractions';

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

  const items = [
    { id: 1, category: CategoryName.HistoricalSites },
    { id: 2, category: CategoryName.FoodAndDrinks },
    { id: 3, category: CategoryName.Shopping },
  ];

  return (
    <Stack id='details-city'>
      <Stack align='center'>
        <Title className={classes.title}>About {city?.name}</Title>
        <Text c='dimmed' className={classes.description} ta='center'>
          {city?.about}
        </Text>
      </Stack>

      <Group position='center'>
        <Link href={{ pathname: `/countries/${city?.country_id}` }}>
          <Button variant='light' size='sm'>
            Explore {city?.country_name}
          </Button>
        </Link>
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

      {items.map((item) => (
        <CarouselAttractions key={item.id} data={filterAttractionsByCategory(attractions?.data, item.category)} title={item.category} />
      ))}
    </Stack>
  );
};

export default DetailsCity;
