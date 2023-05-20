'use client';
import { cityFetcher, getCityByIdAPI } from '@/api/CitiesAPI';
import { dateToYYYYMMDDAndTime } from '@/helpers/processInfo';
import { weatherSelectorFamily } from '@/recoil/city-weather_state';
import { planSelectorFamily } from '@/recoil/plan_state';
import { BackgroundImage, Card, createStyles, Group, Image, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconCloud } from '@tabler/icons-react';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';

const useStyles = createStyles((theme) => ({
  text: {
    fontFamily: 'inherit',
    color: 'ivory',
    fontSize: theme.fontSizes.sm,
  },
  bold: {
    fontFamily: 'inherit',
    color: 'ivory',
    fontWeight: 600,
  },
  info: {
    fontFamily: 'inherit',
    fontWeight: 500,
    [theme.fn.smallerThan('xs')]: {
      color: theme.colors.gray[8],
    },
  },
}));

interface WeatherCardProps {
  idFromLocalStorage: string;
}

export function WeatherCard({ idFromLocalStorage }: WeatherCardProps) {
  const { classes } = useStyles();
  const plan = useRecoilValue(planSelectorFamily(idFromLocalStorage));
  const city = useSWR(getCityByIdAPI(Number(plan?.city)), cityFetcher, { suspense: true });

  const mobile = useMediaQuery('(max-width: 36em)');

  const weather = useRecoilValue(weatherSelectorFamily(Number(plan?.city)));
  const localTime = dateToYYYYMMDDAndTime(new Date());
  const weatherIconSrc = weather?.current?.condition?.icon || 'https://cdn.weatherapi.com/weather/128x128/day/116.png';
  const backgroundImageSrc = '/assets/background-weather.jpg' || 'https://cdn.weatherapi.com/weather-widget/img/weatherapi-backgrounds/4_widget3.png';
  const unavailable = 'Data unavailable. Please try again later.';

  if (city.error) return <div>Failed to load</div>;

  return (
    <Card withBorder p={0} radius='md'>
      <BackgroundImage src={backgroundImageSrc} radius='md' h={mobile ? 350 : 305}>
        <Stack spacing={0} p='sm'>
          <Group position='center'>
            <Text fz='xl' className={classes.bold}>
              &nbsp;{city.data?.name}, {city.data?.country_name}
            </Text>
            <IconCloud size='1.5rem' color='ivory' />
          </Group>
          <Group position='center'>
            <Text fz={36} className={classes.bold}>
              {weather?.current?.temp_c}°C
            </Text>
            <Image src={weatherIconSrc} alt='weather icon' width={60} />
          </Group>
          <Text fz={26} className={classes.bold} align='center'>
            {weather?.current?.condition?.text}
          </Text>
          <Text fz={18} className={classes.bold} align='center'>
            Feels Like: {weather?.current?.feelslike_c}°C
          </Text>
          {!mobile ? (
            <>
              <Group position='apart' mt='xs'>
                <Text className={classes.text}>Humidity: {weather?.current?.humidity}%</Text>
                <Text className={classes.text}>Pressure: {weather?.current?.pressure_mb} mb</Text>
                <Text className={classes.text}>Precipitation: {weather?.current?.precip_mm} mm</Text>
              </Group>
              <Group position='apart'>
                <Text className={classes.text}>Visibility: {weather?.current?.vis_km} km</Text>
                <Text className={classes.text}>Cloudy: {weather?.current?.cloud}%</Text>
                <Text className={classes.text}>UV Index: {weather?.current?.uv}</Text>
              </Group>
              <Group position='apart' mb='xs'>
                <Text className={classes.text}>
                  Wind Direction: {weather?.current?.wind_degree}° {weather?.current?.wind_dir}
                </Text>
                <Text className={classes.text}>Wind Speed: {weather?.current?.wind_kph} km/h</Text>
                <Text className={classes.text}>Wind Gust: {weather?.current?.gust_kph} km/h</Text>
              </Group>
            </>
          ) : (
            <>
              <Group position='apart' mt='xs'>
                <Text className={classes.text}>Humidity: {weather?.current?.humidity}%</Text>
                <Text className={classes.text}>Pressure: {weather?.current?.pressure_mb} mb</Text>
              </Group>
              <Group position='apart'>
                <Text className={classes.text}>Precipitation: {weather?.current?.precip_mm} mm</Text>
                <Text className={classes.text}>Visibility: {weather?.current?.vis_km} km</Text>
              </Group>
              <Group position='apart'>
                <Text className={classes.text}>Cloudy: {weather?.current?.cloud}%</Text>
                <Text className={classes.text}>UV Index: {weather?.current?.uv}</Text>
              </Group>
              <Group position='apart'>
                <Text className={classes.text}>Wind Speed: {weather?.current?.wind_kph} km/h</Text>
                <Text className={classes.text}>Wind Gust: {weather?.current?.gust_kph} km/h</Text>
              </Group>
              <Group position='apart' mb='xs'>
                <Text className={classes.text}>
                  Wind Direction: {weather?.current?.wind_degree}° {weather?.current?.wind_dir}
                </Text>
              </Group>
            </>
          )}
          <Text className={classes.info} color='dimmed' size='xs'>
            Local time: {localTime}
          </Text>
          <Text className={classes.info} color='dimmed' size='xs'>
            Last updated: {weather?.current?.last_updated || unavailable}
          </Text>
        </Stack>
      </BackgroundImage>
    </Card>
  );
}
