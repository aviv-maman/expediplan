'use client';

import { Box, Button, Group, Paper, Select, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconFlag } from '@tabler/icons-react';
import DropdownWithIcon from '../DropdownWithIcon';
import { COUNTRIES } from './dropdownCountriesData';
import type { City } from '../../../types/general';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<City[]>);
const getAPI = (id: number) => {
  const env = process.env.NODE_ENV;
  const hostname = env === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_HOSTNAME;
  const API = `${hostname}/api/cities/country/${id}`;
  return API;
};

interface NewPlanFormProps {}

const NewPlanForm: React.FC = ({}) => {
  const form = useForm({
    initialValues: {
      name: '',
      country: 0,
      city: 0,
    },
    validate: {},
  });

  const { data, error } = useSWR(getAPI(form.values.country), fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Box maw={300} mx='auto'>
      <Title align='center' sx={(theme) => ({ fontWeight: 900 })}>
        Create New Plan
      </Title>
      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        <form
          onSubmit={form.onSubmit((values) => {
            values.country = Number(values.country);
            console.log(data.map((item) => ({ value: String(item.id), label: item.name })));
          })}>
          <TextInput required minLength={3} label='Name' placeholder='Name of plan' {...form.getInputProps('name')} />
          <DropdownWithIcon
            required
            label='Country'
            placeholder='Choose country'
            data={COUNTRIES.sort((a, b) => a.label.localeCompare(b.label)).map((item) => ({ ...item, value: String(item.value) }))}
            searchable
            maxDropdownHeight={280}
            nothingFound='Nothing found'
            filter={(value, item) => item?.label?.toLowerCase().includes(value.toLowerCase().trim()) || false}
            icon={<IconFlag size='1rem' />}
            {...form.getInputProps('country')}
            transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
          />
          <Select
            required
            label='City'
            placeholder='Choose city'
            data={data.map((item) => ({ value: String(item.id), label: item.name }))}
            // data={[
            //   { value: '75', label: 'React' },
            //   { value: 'ng', label: 'Angular' },
            //   { value: 'svelte', label: 'Svelte' },
            //   { value: 'vue', label: 'Vue' },
            // ]}
            disabled={form.values.country === 0 || !data}
            {...form.getInputProps('city')}
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
