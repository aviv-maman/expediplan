'use client';
import { Carousel } from '@mantine/carousel';
import { Paper, createStyles, rem, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import type { Attraction } from '../../types/general';

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(220),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  title: {
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

interface CardsCarouselProps {
  data: Attraction[];
}

const CardsCarousel: React.FC<CardsCarouselProps> = ({ data }) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Carousel
      slideSize='50%'
      breakpoints={[
        { maxWidth: 'sm', slideSize: '100%', slideGap: 'sm' },
        { maxWidth: 'md', slideSize: '100%', slideGap: 'sm' },
      ]}
      slideGap='sm'
      align='start'
      loop>
      {data?.map((item) => (
        <Carousel.Slide key={item.id}>
          <Paper shadow='md' p='xl' radius='md' sx={{ backgroundImage: `url(${item.cover_image})` }} className={classes.card}></Paper>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default CardsCarousel;
