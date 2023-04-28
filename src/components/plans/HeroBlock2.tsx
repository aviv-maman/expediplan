'use client';
import { useRecoilValue } from 'recoil';
import { planListState } from '@/layout/GlobalRecoilRoot';
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

interface HeroBlock2Props {
  coverImage: string;
  cityName: string;
  id: string;
}

const HeroBlock2: React.FC<HeroBlock2Props> = ({ coverImage, cityName, id }) => {
  const { classes } = useStyles();
  const planList = useRecoilValue(planListState);
  const plan = planList.find((plan) => plan.id === id);

  // const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));

  return (
    <div className={classes.root} style={{ backgroundImage: `url(${coverImage})` }}>
      <Container size='lg'>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              <Text component='span' inherit variant='gradient' gradient={{ from: 'pink', to: 'yellow' }}>
                {plan?.name}
              </Text>
              <br />
              {/* {duration} days in {cityName} */}
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

export default HeroBlock2;
