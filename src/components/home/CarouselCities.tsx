'use client';

import { Carousel } from '@mantine/carousel';
import useSWR from 'swr';
import { City } from './home';
import { Highlight, Paper, Text, Title, createStyles, rem } from '@mantine/core';

const fetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<City[]>);
const ids = ['77340', '143446', '59582', '44856', '50388', '99972'];
const getAPI = (ids: string | string[]) => {
  const env = process.env.NODE_ENV;
  const hostname = env === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_HOSTNAME;
  const params = new URLSearchParams({ id: String(ids) });
  const API = `${hostname}/api/cities?${params}`;
  return API;
};

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(240),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[6],
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

interface CarouselCitiesProps {}

const CarouselCities: React.FC<CarouselCitiesProps> = ({}) => {
  const { classes } = useStyles();
  const { data, error } = useSWR(getAPI(ids), fetcher);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Carousel
      withIndicators
      slideSize='33.33%'
      slideGap='md'
      loop
      align='start'
      breakpoints={[
        { maxWidth: 'md', slideSize: '50%' },
        { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
      ]}>
      {data.map((city) => (
        <Carousel.Slide key={city.id}>
          <Paper shadow='md' p='xl' radius='md' sx={{ backgroundImage: `url(${city.cover_image})` }} className={classes.card}>
            <div>
              <Highlight highlightColor='indigo' highlight={city.country_name} className={classes.category} size='xs'>
                {city.country_name}
              </Highlight>
              <Title order={3} className={classes.title}>
                {city.name}
              </Title>
            </div>
          </Paper>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default CarouselCities;
