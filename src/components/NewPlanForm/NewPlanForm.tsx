'use client';

import { Box, Button, Group, Paper, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconFlag } from '@tabler/icons-react';
import DropdownWithIcon from '../DropdownWithIcon';
import { COUNTRIES } from './dropdownCountriesData';

interface NewPlanFormProps {}

const NewPlanForm: React.FC = ({}) => {
  const form = useForm({
    initialValues: {
      name: '',
      country: '',
    },
    validate: {},
  });

  return (
    <Box maw={300} mx='auto'>
      <Title align='center' sx={(theme) => ({ fontWeight: 900 })}>
        Create New Plan
      </Title>
      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput required minLength={3} label='Name' placeholder='Name of plan' {...form.getInputProps('name')} />
          <DropdownWithIcon
            label='Country'
            placeholder='Choose country'
            data={COUNTRIES.sort((a, b) => a.label.localeCompare(b.label))}
            searchable
            maxDropdownHeight={400}
            nothingFound='Nothing found'
            filter={(value, item) => item?.label?.toLowerCase().includes(value.toLowerCase().trim()) || false}
            icon={<IconFlag size='1rem' />}
            {...form.getInputProps('country')}
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
