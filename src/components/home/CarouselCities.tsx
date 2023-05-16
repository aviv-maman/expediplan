'use client';
import { Carousel } from '@mantine/carousel';
import useSWR from 'swr';
import { Highlight, Paper, Skeleton, Stack, Title, createStyles, rem } from '@mantine/core';
import { citiesFetcher, getCitiesAPI } from '@/api/CitiesAPI';
import Link from 'next/link';
import { POPULAR_DESTINATIONS } from '@/constants';

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
  },

  category: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[6],
    fontWeight: 700,
    textTransform: 'uppercase',
  },

  carouselTitle: {
    fontWeight: 900,
    color: theme.colorScheme === 'dark' ? theme.colors.green[3] : theme.colors.green[7],
    fontSize: rem(28),
  },
}));

const CarouselCities: React.FC = () => {
  const { classes } = useStyles();
  const { data, error } = useSWR(getCitiesAPI(POPULAR_DESTINATIONS), citiesFetcher);
  if (error) return <div>Failed to load</div>;
  // if (!data) return <div>Loading...</div>;

  return (
    <Stack>
      <Title align='center' className={classes.carouselTitle}>
        Popular Destinations
      </Title>
      <Carousel
        withControls={!!data?.length}
        draggable={!!data?.length}
        slideSize='33.333%'
        slideGap='md'
        loop
        align='start'
        breakpoints={[
          { maxWidth: 'sm', slideSize: '50%' },
          { maxWidth: 'xs', slideSize: '100%', slideGap: 0 },
        ]}
        mx={{ xl: '20%' }}>
        {data?.map((city) => (
          <Carousel.Slide key={city.id}>
            <Link href={{ pathname: `cities/${city?.id}` }}>
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
            </Link>
          </Carousel.Slide>
        ))}

        {!data?.length && (
          <>
            <Carousel.Slide>
              <Skeleton p='xl' radius='md' className={classes.card} />
            </Carousel.Slide>
            <Carousel.Slide>
              <Skeleton p='xl' radius='md' className={classes.card} />
            </Carousel.Slide>
            <Carousel.Slide>
              <Skeleton p='xl' radius='md' className={classes.card} />
            </Carousel.Slide>
          </>
        )}
      </Carousel>
    </Stack>
  );
};

export default CarouselCities;
