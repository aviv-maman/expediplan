'use client';
import { useRecoilValue } from 'recoil';
import { createStyles, Container, Title, Text, rem, BackgroundImage, Skeleton, Button } from '@mantine/core';
import dayjs from 'dayjs';
import useSWR from 'swr';
import { cityFetcher, getCityByIdAPI } from '@/api/CitiesAPI';
import { planSelectorFamily } from '@/recoil/plan_state';
import { IconInfoSquare } from '@tabler/icons-react';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  title: {
    color: theme.white,
    fontWeight: 900,
    maxWidth: rem(500),
    fontSize: rem(30),

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      fontSize: rem(24),
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

  buttons: {
    display: 'flex',
    flexDirection: 'row',
    height: '8.5rem',
    alignItems: 'flex-end',
    gap: '1rem',
  },
}));

interface HeroBlockProps {
  planId: string;
}

const HeroBlock: React.FC<HeroBlockProps> = ({ planId }) => {
  const { classes } = useStyles();
  const plan = useRecoilValue(planSelectorFamily({ id: planId }));
  const city = useSWR(getCityByIdAPI(Number(plan?.city)), cityFetcher, { suspense: true });

  if (city.error) return <div>Failed to load</div>;
  if (!city.data) return <Skeleton height={265} />;

  return (
    <BackgroundImage
      src={city?.data?.cover_image}
      radius='sm'
      mih={265}
      sx={{
        backgroundImage: `linear-gradient(0deg, rgba(130, 201, 30, 0) 0%, #0a0f14 100%), url(${city?.data?.cover_image})`,
      }}>
      <Container size='2xl' className={classes.wrapper}>
        <Title className={classes.title}>
          <Text component='span' variant='gradient' gradient={{ from: 'teal', to: 'lime' }}>
            {plan?.name}
          </Text>
        </Title>
        <Text component='span' variant='gradient' fz='xl' fw={500}>
          {plan?.duration} days in {plan?.cityName}
        </Text>
        <Text className={classes.description} ff='inherit'>
          {dayjs(plan?.startDate).format('YYYY-MM-DD')} - {dayjs(plan?.endDate).format('YYYY-MM-DD')}
        </Text>

        <div className={classes.buttons}>
          <Link href={{ pathname: `/cities/${city.data.id}` }}>
            <Button variant='light' leftIcon={<IconInfoSquare />}>
              {city.data.name}
            </Button>
          </Link>
        </div>
      </Container>
    </BackgroundImage>
  );
};

export default HeroBlock;
