'use client';
import { createStyles, Container, Title, Text, rem, BackgroundImage } from '@mantine/core';
import type { Country } from '../../../types/general';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginLeft: 10,
    marginTop: 10,
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

interface HeroCountryProps {
  countryFromServer?: Country;
}

const HeroCountry: React.FC<HeroCountryProps> = ({ countryFromServer }) => {
  const { classes } = useStyles();

  return (
    <BackgroundImage
      src={countryFromServer?.cover_image || ''}
      radius='sm'
      mih={265}
      sx={{
        backgroundImage: `linear-gradient(0deg, rgba(130, 201, 30, 0) 0%, #0a0f14 100%), url(${countryFromServer?.cover_image})`,
      }}>
      <Container className={classes.wrapper}>
        <Title className={classes.title}>
          <Text color='#00796B'>{countryFromServer?.name}</Text>
        </Title>
      </Container>
    </BackgroundImage>
  );
};

export default HeroCountry;
