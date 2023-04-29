'use client';
import { Avatar, Box, Button, Group, Paper, Select, TextInput, Title, createStyles, rem } from '@mantine/core';
import { hasLength, isNotEmpty, useForm } from '@mantine/form';
import { IconBuilding, IconCalendar, IconFlag, IconFlagFilled, IconId } from '@tabler/icons-react';
import DropdownWithIcon from '../DropdownWithIcon';
import type { Plan } from '../../../types/general';
import useSWR from 'swr';
import { DatePickerInput } from '@mantine/dates';
import { useRecoilState } from 'recoil';
import dayjs from 'dayjs';
import { Suspense } from 'react';
import { countriesFetcher, getCountriesAPI } from '@/api/CountriesAPI';
import { citiesFetcher, getCitiesByCountryIdAPI } from '@/api/CitiesAPI';
import { planListState } from '@/recoil/recoil_plan_state';

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

const NewPlanForm: React.FC = () => {
  const { classes } = useStyles();
  const [items, setItems] = useRecoilState(planListState);
  const insertItem = (plan: Plan) => {
    setItems([...items, plan]);
  };

  const form = useForm({
    initialValues: {
      name: '',
      country: { id: '', flag: '' },
      city: '',
      startDate: undefined,
      endDate: undefined,
      countryName: '',
      cityName: '',
    },
    validate: {
      name: isNotEmpty('Enter a name for your plan') && hasLength({ min: 3 }, 'Name must have 3 or more characters'),
      country: isNotEmpty('Country is required'),
      city: isNotEmpty('City is required'),
    },

    transformValues: (values) => ({
      ...values,
      country: Number(values.country.id) || 0,
      city: Number(values.city) || 0,
      startDate: new Date(dayjs(values.startDate).format('YYYY-MM-DD') || 0), //dayjs(values.startDate).format('YYYY-MM-DD')
      endDate: new Date(dayjs(values.endDate).format('YYYY-MM-DD') || 0), //values.endDate.toISOString().split('T')[0]
    }),
  });

  const countries = useSWR(getCountriesAPI(), countriesFetcher);
  const cities = useSWR(getCitiesByCountryIdAPI(form.getTransformedValues().country), citiesFetcher);

  const duration = dayjs(form.values.endDate).diff(dayjs(form.values.startDate), 'day') + 1;

  if (countries.error) return <div>Failed to load</div>;
  if (cities.error) return <div>Failed to load</div>;

  // if (countries.isLoading) return <div>Loading...</div>;
  // if (cities.isLoading) return <div>Loading...</div>;

  return (
    <Box maw={300} mx='auto'>
      <Title align='center' sx={(theme) => ({ fontWeight: 700, color: theme.colors.red[3] })}>
        Create New Plan
      </Title>
      <Paper withBorder shadow='md' p={30} radius='md' className={classes.card} mt={`calc(${ICON_SIZE} / 3)`}>
        <Avatar src={form.values.country.flag} alt='flag' className={classes.icon} size={ICON_SIZE} radius={ICON_SIZE} color='blue'>
          <IconFlagFilled size='2rem' stroke={1.5} />
        </Avatar>
        <form
          onSubmit={form.onSubmit((values) => {
            insertItem({
              ...values,
              id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
              days: Array.from({ length: duration }).map((_, i) => ({
                index: i,
                date: new Date(dayjs(values.startDate).add(i, 'day').format('YYYY-MM-DD')),
              })),
              duration: duration,
            });
          })}>
          <TextInput required minLength={3} label='Name' placeholder='Name of plan' icon={<IconId size='1rem' />} {...form.getInputProps('name')} />

          <Suspense
            fallback={<Select required label='Country' placeholder='Loading countries...' icon={<IconFlag size='1rem' />} data={[]} disabled />}>
            <DropdownWithIcon
              required
              label='Country'
              placeholder='Choose country'
              icon={<IconFlag size='1rem' />}
              data={
                countries.data
                  ?.sort((a, b) => a.name.localeCompare(b.name))
                  .map((item) => ({ value: String(item.id), label: item.name, icon: item.flag })) ?? []
              }
              searchable
              maxDropdownHeight={280}
              nothingFound='Nothing found'
              filter={(value, item) => item?.label?.toLowerCase().includes(value.toLowerCase().trim()) || false}
              {...form.getInputProps('country.id')}
              transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
              disabled={!countries.data || countries.isLoading}
              onChange={(value) => {
                form.setFieldValue('country.id', value || undefined);
                form.setFieldValue('country.flag', countries.data?.find((item) => item.id === Number(value))?.flag || undefined);
                form.setFieldValue('city', '');
                form.setFieldValue('countryName', countries.data?.find((item) => item.id === Number(value))?.name || '');
                form.setFieldValue('cityName', cities.data?.find((item) => item.id === Number(value))?.name || '');
              }}
            />
          </Suspense>

          <Suspense
            fallback={<Select required label='City' placeholder='Loading cities...' icon={<IconBuilding size='1rem' />} data={[]} disabled />}>
            <Select
              required
              label='City'
              placeholder='Choose city'
              icon={<IconBuilding size='1rem' />}
              data={
                cities.data?.sort((a, b) => a.name.localeCompare(b.name)).map((item) => ({ value: String(item.id), label: item.name })) || [
                  'Loading...',
                ]
              }
              transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
              {...form.getInputProps('city')}
              disabled={form.values.country.id === '' || form.values.country.id === undefined || !countries.data || cities.isLoading}
              onChange={(value) => {
                form.setFieldValue('city', value || '');
                form.setFieldValue('cityName', cities.data?.find((item) => item.id === Number(value))?.name || '');
              }}
            />
          </Suspense>

          <DatePickerInput
            required
            label='Start Date'
            placeholder='Choose start date'
            icon={<IconCalendar size='1rem' />}
            mx='auto'
            maw={400}
            {...form.getInputProps('startDate')}
            minDate={new Date()}
            maxDate={new Date() && form.values.endDate}
          />
          <DatePickerInput
            required
            label='End Date'
            placeholder='Choose end date'
            icon={<IconCalendar size='1rem' />}
            mx='auto'
            maw={400}
            {...form.getInputProps('endDate')}
            minDate={form.values.startDate ? form.values.startDate : new Date()}
            maxDate={dayjs().add(1, 'year').toDate()}
          />
          <Group position='right' mt='md'>
            <Button type='submit'>Create</Button>
          </Group>
        </form>
      </Paper>
    </Box>
  );
};

export default NewPlanForm;
