'use client';
import { planSelectorFamily } from '@/recoil/plan_state';
import { ActionIcon, Button, Group, Paper, Select, Text, createStyles, rem } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconBrowserPlus, IconBuildingSkyscraper, IconCategory, IconClock, IconIdBadge } from '@tabler/icons-react';
import { useParams } from 'next/navigation';
import { Suspense, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { fakeDelay } from '@/helpers/network';
import { addInterestToDayInsidePlan, attractionsFetcher, getAttractionsAPI } from '@/api/AttractionsAPI';
import useSWR from 'swr';
import { categoriesFetcher, getCategoriesAPI } from '@/api/CategoriesAPI';

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

interface NewInterestFormProps {
  dayIndex: number;
  subtitle: string;
  closeModal: () => void;
}

const NewInterestForm: React.FC<NewInterestFormProps> = ({ subtitle, dayIndex, closeModal }) => {
  const { classes } = useStyles();
  const ref = useRef<HTMLInputElement>(null);

  const form = useForm({
    initialValues: {
      category: '',
      type: '',
      attraction_id: '',
      startTime: '',
      endTime: '',
    },

    transformValues: (values) => ({
      ...values,
      attraction_id: Number(values.attraction_id) || 0,
      startTime: values.startTime ? values.startTime : '00:00',
      endTime: values.endTime ? values.endTime : '00:00',
    }),
  });

  const params = useParams();
  const [plan, setPlan] = useRecoilState(planSelectorFamily(params.id));
  const [isLoading, setIsLoading] = useState(false);

  const categories = useSWR(getCategoriesAPI(), categoriesFetcher);
  const types = categories.data?.find((item) => item.name === form.values.category)?.types;
  const attractions = useSWR(getAttractionsAPI(), attractionsFetcher).data?.filter(
    (item) => item.category === form.values.category && item.type === form.values.type && item.city === plan?.city
  );

  return (
    <>
      <Text>{subtitle}</Text>
      <Paper withBorder shadow='md' p={30} radius='md' className={classes.card} mt={`calc(${ICON_SIZE} / 5)`}>
        <form
          onSubmit={form.onSubmit(async (interest) => {
            if (!plan) return;
            setIsLoading(true);
            const res = await fakeDelay(1);
            const planWithInterest = addInterestToDayInsidePlan(interest, dayIndex, plan);
            setPlan(planWithInterest);
            setIsLoading(false);
            res && closeModal();
          })}>
          <Suspense
            fallback={
              <Select required label='Category' placeholder='Loading categories...' icon={<IconCategory size='1rem' />} data={[]} disabled />
            }>
            <Select
              required
              label='Category'
              placeholder='Choose category'
              icon={<IconCategory size='1rem' />}
              data={categories.data?.sort((a, b) => a.name.localeCompare(b.name)).map((item) => ({ value: item.name, label: item.name })) ?? []}
              searchable
              maxDropdownHeight={280}
              nothingFound='Nothing found'
              filter={(value, item) => item?.label?.toLowerCase().includes(value.toLowerCase().trim()) || false}
              {...form.getInputProps('category')}
              transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
              disabled={!plan || !categories.data || categories.isLoading}
              onChange={(value) => {
                form.setFieldValue('category', value || '');
                form.setFieldValue('type', '');
              }}
            />
          </Suspense>

          <Suspense
            fallback={
              <Select required label='Type' placeholder='Loading types...' icon={<IconBuildingSkyscraper size='1rem' />} data={[]} disabled />
            }>
            <Select
              required
              label='Type'
              placeholder='Choose type'
              icon={<IconBuildingSkyscraper size='1rem' />}
              data={types?.sort((a, b) => a.localeCompare(b)).map((item) => ({ value: item, label: item })) || []}
              transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
              {...form.getInputProps('type')}
              disabled={form.values.category === '' || !form.values.category || !categories.data || categories.isLoading}
            />
          </Suspense>

          <Suspense
            fallback={
              <Select required label='Attraction' placeholder='Loading attractions...' icon={<IconIdBadge size='1rem' />} data={[]} disabled />
            }>
            <Select
              required
              label='Attraction'
              placeholder='Choose attraction'
              icon={<IconIdBadge size='1rem' />}
              data={attractions?.sort((a, b) => a.name.localeCompare(b.name)).map((item) => ({ value: String(item.id), label: item.name })) || []}
              transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
              {...form.getInputProps('attraction_id')}
              disabled={
                form.values.category === '' ||
                form.values.category === undefined ||
                form.values.type === '' ||
                form.values.type === undefined ||
                !categories.data ||
                categories.isLoading
              }
            />
          </Suspense>

          <TimeInput
            required
            label='Start Time'
            placeholder='Choose start time'
            icon={<IconClock size='1rem' />}
            mx='auto'
            maw={400}
            ref={ref}
            rightSection={
              <ActionIcon onClick={() => ref?.current?.showPicker()}>
                <IconClock size='1rem' />
              </ActionIcon>
            }
            max={form.values.endTime ? form.values.endTime : '23:59'}
            {...form.getInputProps('startTime')}
          />

          <TimeInput
            required
            label='End Time'
            placeholder='Choose end time'
            icon={<IconClock size='1rem' />}
            mx='auto'
            maw={400}
            ref={ref}
            rightSection={
              <ActionIcon onClick={() => ref?.current?.showPicker()}>
                <IconClock size='1rem' />
              </ActionIcon>
            }
            {...form.getInputProps('endTime')}
            min={form.values.startTime ? form.values.startTime : '00:00'}
          />

          <Group position='right' mt='md'>
            <Button type='submit' leftIcon={<IconBrowserPlus />} loading={isLoading}>
              Add
            </Button>
          </Group>
        </form>
      </Paper>
    </>
  );
};

export default NewInterestForm;
