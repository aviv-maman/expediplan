'use client';
import { Avatar, Box, Button, Group, Paper, Select, TextInput, ThemeIcon, Title, createStyles, rem } from '@mantine/core';
import { hasLength, isNotEmpty, useForm } from '@mantine/form';
import { IconFlag, IconFlagFilled } from '@tabler/icons-react';
import DropdownWithIcon from '../DropdownWithIcon';
import type { City, Country } from '../../../types/general';
import useSWR from 'swr';
import { DatePickerInput } from '@mantine/dates';

const ICON_SIZE = rem(60);

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    overflow: 'visible',
    padding: theme.spacing.xl,
    paddingTop: `calc(${theme.spacing.xl} * 1.5 + ${ICON_SIZE} / 3)`,
  },

  icon: {
    position: 'absolute',
    top: `calc(-${ICON_SIZE} / 3)`,
    left: `calc(50% - ${ICON_SIZE} / 2)`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

const countriesFetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<Country[]>);
const getCountriesAPI = (ids?: string | string[]) => {
  const env = process.env.NODE_ENV;
  const hostname = env === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_HOSTNAME;
  const params = new URLSearchParams(ids ? { id: String(ids) } : undefined);
  const API = `${hostname}/api/countries?${params}`;
  return API;
};

const citiesFetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<City[]>);
const getCityByCountryIdAPI = (id: number) => {
  const env = process.env.NODE_ENV;
  const hostname = env === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_HOSTNAME;
  const API = `${hostname}/api/cities/country/${id}`;
  return API;
};

const NewPlanForm: React.FC = () => {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      name: '',
      country: 0,
      city: 0,
      startDate: undefined,
      endDate: undefined,
      flag: '',
    },
    validate: {
      name: isNotEmpty('Enter a name for your plan') && hasLength({ min: 3 }, 'Name must have 3 or more characters'),
      country: isNotEmpty('Country is required'),
      city: isNotEmpty('City is required'),
    },
  });

  const countries = useSWR(getCountriesAPI(), countriesFetcher);
  const cities = useSWR(getCityByCountryIdAPI(form.values.country), citiesFetcher);

  if (countries.error) return <div>Failed to load</div>;
  if (cities.error) return <div>Failed to load</div>;

  return (
    <Box maw={300} mx='auto'>
      <Title align='center' sx={(theme) => ({ fontWeight: 900 })}>
        Create New Plan
      </Title>
      <Paper withBorder shadow='md' p={30} radius='md' className={classes.card} mt={`calc(${ICON_SIZE} / 3)`}>
        {/* <ThemeIcon className={classes.icon} size={ICON_SIZE} radius={ICON_SIZE}>
          <IconFlagFilled size='2rem' stroke={1.5} />
        </ThemeIcon> */}
        <Avatar src={form.values.flag} alt='flag' className={classes.icon} size={ICON_SIZE} radius={ICON_SIZE} color='blue'>
          <IconFlagFilled size='2rem' stroke={1.5} />
        </Avatar>
        <form
          onSubmit={form.onSubmit((values) => {
            values.country = Number(values.country);
            values.city = Number(values.city);
            console.log(values);
          })}>
          <TextInput required minLength={3} label='Name' placeholder='Name of plan' {...form.getInputProps('name')} />
          <DropdownWithIcon
            required
            label='Country'
            placeholder='Choose country'
            data={
              countries.data
                ?.sort((a, b) => a.name.localeCompare(b.name))
                .map((item) => ({ value: String(item.id), label: item.name, icon: item.flag })) || [{ value: '', label: 'Loading...', icon: '' }]
            }
            searchable
            maxDropdownHeight={280}
            nothingFound='Nothing found'
            filter={(value, item) => item?.label?.toLowerCase().includes(value.toLowerCase().trim()) || false}
            icon={<IconFlag size='1rem' />}
            {...form.getInputProps('country')}
            transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
            disabled={!countries.data || countries.isLoading}
            // onChange={(value) => {
            //   form.setFieldValue('country', Number(value));
            //   form.setFieldValue('flag', countries.data?.find((item) => item.id === Number(value))?.flag || '');
            //   form.setFieldValue('city', 0);
            // }}
          />
          <Select
            required
            label='City'
            placeholder='Choose city'
            data={
              cities.data?.sort((a, b) => a.name.localeCompare(b.name)).map((item) => ({ value: String(item.id), label: item.name })) || [
                'Loading...',
              ]
            }
            transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
            disabled={form.values.country === 0 || !cities.data || cities.isLoading}
            {...form.getInputProps('city')}
          />
          <DatePickerInput label='Start Date' placeholder='Choose start date' mx='auto' maw={400} {...form.getInputProps('startDate')} />
          <DatePickerInput label='End Date' placeholder='Choose end date' mx='auto' maw={400} {...form.getInputProps('endDate')} />
          <Group position='right' mt='md'>
            <Button type='submit'>Create</Button>
          </Group>
        </form>
      </Paper>
    </Box>
  );
};

export default NewPlanForm;
