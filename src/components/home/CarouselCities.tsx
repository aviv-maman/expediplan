'use client';

import { Carousel } from '@mantine/carousel';

interface CarouselCitiesProps {}

const CarouselCities: React.FC<CarouselCitiesProps> = ({}) => {
  return (
    <Carousel
      withIndicators
      height={200}
      slideSize='33.333333%'
      slideGap='md'
      loop
      align='start'
      breakpoints={[
        { maxWidth: 'md', slideSize: '50%' },
        { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
      ]}>
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
};

export default CarouselCities;
