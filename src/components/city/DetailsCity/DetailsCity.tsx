'use client';
import { createStyles, Title, Text, rem, Stack, Group, Button, Paper, Highlight } from '@mantine/core';
import type { City } from '../../../../types/general';
import Link from 'next/link';
import useSWR from 'swr';
import { attractionsFetcher, getAttractionsByCityIdAPI } from '@/api/AttractionsAPI';
import { CATEGORIES_IN_CITY_PAGE, CategoryName } from '@/constants';
import { debounceAction, filterAttractionsByCategory, getNumberOfLinesByRef } from '@/helpers/processInfo';
import CarouselAttractions from '../CarouselAttractions';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(30),
    fontWeight: 900,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(18),
    },
  },

  subtitle: {
    fontSize: rem(18),
    fontWeight: 800,
    [theme.fn.gradient()]: { from: 'green', to: 'orange' },
  },

  description: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.gray[7],

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
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
  const mobile = useMediaQuery('(max-width: 36em)');

  const attractions = useSWR(getAttractionsByCityIdAPI(Number(city?.id), CATEGORIES_IN_CITY_PAGE), attractionsFetcher, { suspense: true });
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prevState) => !prevState);
    showMore ? setLineClamp(0) : setLineClamp(10);
  };

  const elementRef = useRef<HTMLDivElement>(null);
  const [disabled, setDisabled] = useState(true);
  const [lineClamp, setLineClamp] = useState(10);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    setDisabled(false);
    setShowMore(true);
    const lines = getNumberOfLinesByRef(elementRef);
    if (lines < 10) {
      setDisabled(true);
      setShowMore(false);
    }
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
    const debouncedHandleResize = debounceAction(handleResize, 1000);

    window.addEventListener('resize', debouncedHandleResize);

    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, [dimensions]);

  const items = [
    { id: 1, category: CategoryName.HistoricalSites },
    { id: 2, category: CategoryName.FoodAndDrinks },
    { id: 3, category: CategoryName.Shopping },
  ];

  return (
    <Stack id='details-city'>
      <Stack>
        {mobile ? (
          <>
            <Title className={classes.title} ta='center'>
              About {city?.name}
            </Title>
            <Group position='right' spacing='xs'>
              <Button size='xs' color='lime' onClick={toggleShowMore} disabled={!city?.about || disabled} miw={93}>
                {showMore ? 'Show More' : disabled ? 'Show More' : 'Show Less'}
              </Button>
            </Group>
          </>
        ) : (
          <Group position='apart' spacing='xs'>
            <Title className={classes.title} ta='center'>
              About {city?.name}
            </Title>
            <Button size='xs' color='lime' onClick={toggleShowMore} disabled={!city?.about || disabled} miw={93}>
              {showMore ? 'Show More' : disabled ? 'Show More' : 'Show Less'}
            </Button>
          </Group>
        )}
        <Paper withBorder sx={(theme) => ({ padding: theme.spacing.sm })}>
          <Highlight
            ref={elementRef}
            id={`about-${city?.id}`}
            highlight={city?.name || ''}
            className={classes.description}
            ff='inherit'
            lineClamp={lineClamp}
            highlightStyles={(theme) => ({
              backgroundImage: theme.fn.linearGradient(45, theme.colors.cyan[5], theme.colors.indigo[5]),
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            })}>
            {city?.about || 'Data is unavailable'}
          </Highlight>
        </Paper>
      </Stack>

      <Group position='center'>
        <Link href={{ pathname: `/create-new-plan`, search: `country=${city?.country_id}&city=${city?.id}` }}>
          <Button variant='light' size='sm'>
            Create Plan in {city?.name}
          </Button>
        </Link>
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
      <Text c='dimmed' ff='inherit' className={classes.description} ta='center' mt='sm'>
        Explore the best places to visit in {city?.name}
      </Text>

      {items.map((item) => (
        <CarouselAttractions key={item.id} data={filterAttractionsByCategory(attractions?.data, item.category)} title={item.category} />
      ))}
    </Stack>
  );
};

export default DetailsCity;
