'use client';
import { createStyles, Container, Title, Text, rem, BackgroundImage, useMantineTheme } from '@mantine/core';
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
  country?: Country;
}

const HeroCountry: React.FC<HeroCountryProps> = ({ country }) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <BackgroundImage
      src={country?.cover_image || ''}
      radius='sm'
      mih={265}
      sx={{
        backgroundImage: `linear-gradient(0deg, rgba(130, 201, 30, 0) 0%, #0a0f14 100%), url(${country?.cover_image})`,
      }}>
      <Container className={classes.wrapper}>
        <Title className={classes.title}>
          <Text variant='gradient' gradient={{ from: theme.colors.cyan[5], to: theme.colors.indigo[5], deg: 45 }}>
            {country?.name}
          </Text>
        </Title>
      </Container>
    </BackgroundImage>
  );
};

export default HeroCountry;
