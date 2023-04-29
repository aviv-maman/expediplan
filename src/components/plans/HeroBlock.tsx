'use client';
import { createStyles, Container, Title, Text, rem } from '@mantine/core';
import dayjs from 'dayjs';

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

interface HeroBlockProps {
  coverImage: string;
  cityName: string;
  planName: string;
  startDate: Date;
  endDate: Date;
  duration: number;
}

const HeroBlock: React.FC<HeroBlockProps> = ({ coverImage, cityName, planName, startDate, endDate, duration }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.root} style={{ backgroundImage: `url(${coverImage})` }}>
      <Container size='lg'>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              <Text component='span' inherit variant='gradient' gradient={{ from: 'pink', to: 'yellow' }}>
                {planName}
              </Text>
              <br />
              {duration} days in {cityName}
            </Title>
            <Text className={classes.description} mt={30}>
              {dayjs(startDate).format('YYYY-MM-DD')} - {dayjs(endDate).format('YYYY-MM-DD')}
            </Text>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroBlock;
