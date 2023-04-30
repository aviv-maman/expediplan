'use client';
import { useRecoilValue } from 'recoil';
import { createStyles, Container, Title, Text, rem } from '@mantine/core';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getCityById } from '@/api/CitiesAPI';
import type { City } from '../../../types/general';
import { planSelectorFamily } from '@/recoil/plan_state';

const useStyles = createStyles((theme) => ({
  root: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    paddingTop: `calc(${theme.spacing.xl} * 3)`,
    paddingBottom: `calc(${theme.spacing.xl} * 3)`,
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },

  image: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  content: {
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan('md')]: {
      marginRight: 0,
    },
  },

  title: {
    color: theme.white,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: rem(500),
    fontSize: rem(48),

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      fontSize: rem(34),
      lineHeight: 1.15,
    },
  },

  description: {
    color: theme.white,
    opacity: 0.75,
    maxWidth: rem(500),

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
    },
  },
}));

interface HeroBlockGuestProps {
  idFromLocalStorage: string;
}

const HeroBlockGuest: React.FC<HeroBlockGuestProps> = ({ idFromLocalStorage }) => {
  const { classes } = useStyles();
  const plan = useRecoilValue(planSelectorFamily(idFromLocalStorage));
  const [city, setCity] = useState({} as City);

  useEffect(() => {
    const fetchCity = async () => {
      const fetchedCity = await getCityById(Number(plan?.city));
      setCity(fetchedCity);
    };
    fetchCity();
  }, [plan?.city]);

  return (
    <div className={classes.root} style={{ backgroundImage: `url(${city?.cover_image})` }}>
      <Container size='lg'>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              <Text component='span' inherit variant='gradient' gradient={{ from: 'pink', to: 'yellow' }}>
                {plan?.name}
              </Text>
              <br />
              {plan?.duration} days in {plan?.cityName}
            </Title>
            <Text className={classes.description} mt={30}>
              {dayjs(plan?.startDate).format('YYYY-MM-DD')} - {dayjs(plan?.endDate).format('YYYY-MM-DD')}
            </Text>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroBlockGuest;
