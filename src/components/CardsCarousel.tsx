'use client';
import { Carousel } from '@mantine/carousel';
import { Image, Paper, createStyles, rem, useMantineTheme } from '@mantine/core';
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
    border: '1px solid #dee2e6',
  },

  title: {
    borderRadius: '2px',
    backgroundImage: 'linear-gradient(180deg, rgba(48, 46, 46, 0.85) 90%, rgba(38, 207, 52, 0.85) 10%)',
  },

  cover: {
    ...theme.fn.cover(),
  },

  placeholder: {
    height: rem(220),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    border: '1px solid #dee2e6',
    borderRadius: '6px',
  },
}));

interface CardsCarouselProps {
  data: Attraction[];
}

const CardsCarousel: React.FC<CardsCarouselProps> = ({ data }) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  return (
    <Carousel
      slideSize='33.33%'
      breakpoints={[
        { maxWidth: 'sm', slideSize: '50%' },
        { maxWidth: 'xs', slideSize: '100%', slideGap: 0 },
      ]}
      h={mobile ? rem(220) : rem(300)}
      slideGap='md'
      align='start'
      loop
      withControls={!!data?.length}
      draggable={!!data?.length}>
      {data?.map((item) => (
        <Carousel.Slide key={item.id}>
          <Paper shadow='md' p='xl' radius='md' sx={{ backgroundImage: `url(${item.cover_image})` }} className={classes.card}>
            <span className={classes.title}>{item.name}</span>
          </Paper>
        </Carousel.Slide>
      ))}
      {!data?.length && (
        <>
          <Carousel.Slide>
            <Image p='xl' radius='md' className={classes.placeholder} src={null} withPlaceholder alt='placeholder' />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image p='xl' radius='md' className={classes.placeholder} src={null} withPlaceholder alt='placeholder' />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image p='xl' radius='md' className={classes.placeholder} src={null} withPlaceholder alt='placeholder' />
          </Carousel.Slide>
        </>
      )}
    </Carousel>
  );
};

export default CardsCarousel;
