'use client';
import PageLoaderWithHero from '@/components/PageLoaderWithHero';
import { Carousel } from '@mantine/carousel';
import { Skeleton, Stack, createStyles, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  placeholder: {
    height: rem(220),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '6px',
  },
}));

export default function Loading() {
  const { classes } = useStyles();
  // You can add any UI inside Loading, including a Skeleton.

  const items = [1, 2, 3];

  return (
    <>
      <PageLoaderWithHero size='lg' text='Loading city...' />
      {items.map((item) => (
        <Stack key={item}>
          <Skeleton my='xs' radius='md' height={36} />
          <Carousel
            slideSize='33.333%'
            breakpoints={[
              { maxWidth: 'sm', slideSize: '50%' },
              { maxWidth: 'xs', slideSize: '100%', slideGap: 0 },
            ]}
            slideGap='md'
            align='start'
            withControls={false}
            draggable={false}>
            <Carousel.Slide>
              <Skeleton p='xl' radius='md' className={classes.placeholder} />
            </Carousel.Slide>
            <Carousel.Slide>
              <Skeleton p='xl' radius='md' className={classes.placeholder} />
            </Carousel.Slide>
            <Carousel.Slide>
              <Skeleton p='xl' radius='md' className={classes.placeholder} />
            </Carousel.Slide>
          </Carousel>
        </Stack>
      ))}
    </>
  );
}
