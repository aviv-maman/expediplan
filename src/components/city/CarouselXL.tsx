'use client';
import { Carousel } from '@mantine/carousel';
import { Image, Paper, Text, createStyles, rem, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import type { Attraction, City, Country } from '../../../types/general';

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(220),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    border: theme.colorScheme === 'dark' ? '1px solid #dee2e6' : '1px solid #7c7d80',
  },

  title: {
    fontSize: rem(20),
    fontWeight: 800,
  },

  subtitle: {
    borderRadius: '2px',
    backgroundImage:
      theme.colorScheme === 'dark'
        ? 'linear-gradient(180deg, rgba(40, 58, 73, 0.85) 90%, rgba(25, 176, 214, 0.85) 10%)'
        : 'linear-gradient(180deg, rgba(193, 210, 238, 0.85) 86%, rgba(14, 40, 88, 0.85) 10%)',
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
    border: theme.colorScheme === 'dark' ? '1px solid #dee2e6' : '1px solid #7c7d80',
    borderRadius: '6px',
  },
}));

interface CarouselXLProps {
  data: Attraction[] | Country[] | City[] | undefined;
  title: string;
}

const CarouselXL: React.FC<CarouselXLProps> = ({ data, title }) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  return (
    <>
      <Text my='xs' className={classes.title} variant='gradient'>
        {title}
      </Text>
      <Carousel
        slideSize='33.333%'
        breakpoints={[
          { maxWidth: 'sm', slideSize: '50%' },
          { maxWidth: 'xs', slideSize: '100%', slideGap: 0 },
        ]}
        slideGap='md'
        align='start'
        loop
        withControls={!!data?.length}
        draggable={!!data?.length}>
        {data?.map((item) => (
          <Carousel.Slide key={item.id}>
            <Paper shadow='md' p='xl' radius='md' sx={{ backgroundImage: `url(${item.cover_image})` }} className={classes.card}>
              <span className={classes.subtitle}>{item.name}</span>
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
    </>
  );
};

export default CarouselXL;
