'use client';
import { createStyles, Container, Title, Text, rem, BackgroundImage } from '@mantine/core';
import useSWR from 'swr';
import { cityFetcher, getCityByIdAPI } from '@/api/CitiesAPI';
import { useParams } from 'next/navigation';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginLeft: 0,
  },

  title: {
    color: theme.white,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: rem(500),
    fontSize: rem(40),

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      fontSize: rem(36),
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

interface HeroCityProps {}

const HeroCity: React.FC<HeroCityProps> = ({}) => {
  const { classes } = useStyles();
  const params = useParams();
  const city = useSWR(getCityByIdAPI(Number(params?.id)), cityFetcher, { suspense: true });

  return (
    <BackgroundImage
      src={city?.data?.cover_image}
      radius='sm'
      mih={265}
      sx={{
        backgroundImage: `linear-gradient(0deg, rgba(130, 201, 30, 0) 0%, #0a0f14 100%), url(${city?.data?.cover_image})`,
      }}>
      <Container className={classes.wrapper}>
        <Title className={classes.title}>
          <Text component='span' variant='gradient' gradient={{ from: 'grape', to: 'indigo' }}>
            {city?.data?.name}
          </Text>
        </Title>
      </Container>
    </BackgroundImage>
  );
};

export default HeroCity;
