'use client';
import { planSelectorFamily } from '@/recoil/plan_state';
import { ActionIcon, Button, Group, Loader, Paper, Select, Text, createStyles, rem } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconBrowserPlus, IconBuildingSkyscraper, IconCategory, IconClock, IconIdBadge } from '@tabler/icons-react';
import { useParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { fakeDelay } from '@/helpers/network';
import { attractionsFetcher, editInterestInsidePlan, getAttractionsAPI } from '@/api/AttractionsAPI';
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
    lineHeight: 1,
  },
}));

interface EditInterestFormProps {
  dayIndex: number;
  subtitle: string;
  closeModal: () => void;
  attractionIndex: number;
}

const EditInterestForm: React.FC<EditInterestFormProps> = ({ subtitle, dayIndex, closeModal, attractionIndex }) => {
  const { classes } = useStyles();
  const ref = useRef<HTMLInputElement>(null);

  const params = useParams();
  const [plan, setPlan] = useRecoilState(planSelectorFamily(params.id));
  const categories = useSWR(getCategoriesAPI(), categoriesFetcher);

  const currentAttraction = plan?.days[dayIndex]?.interests?.[attractionIndex];
  const attractions = useSWR(getAttractionsAPI(), attractionsFetcher).data?.filter((item) => item.city === plan?.city);
  const currentCategory: string = attractions?.find((item) => item.id === currentAttraction?.attraction_id)?.category || '';
  const currentType: string = attractions?.find((item) => item.id === currentAttraction?.attraction_id)?.type || '';

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

  function loadInitialValues(): Promise<typeof form.values> {
    return new Promise((resolve) => {
      resolve({
        category: currentCategory || '',
        type: currentType || '',
        attraction_id: String(currentAttraction?.attraction_id),
        startTime: currentAttraction?.startTime || '',
        endTime: currentAttraction?.endTime || '',
      });
    });
  }

  useEffect(() => {
    loadInitialValues().then((values) => {
      form.setValues(values);
      form.resetDirty(values);
    });
  }, []);

  const types = categories.data?.find((item) => item.name === form.values.category)?.types;

  const relevantAttractions = useSWR(getAttractionsAPI(), attractionsFetcher).data?.filter(
    (item) => item.city === plan?.city && item.category === form.values.category && item.type === form.values.type
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleEditInterest = async () => {
    form.onSubmit(async (interest) => {
      const interests = plan?.days[dayIndex]?.interests;
      if (!plan || !interests) return;
      setIsLoading(true);
      const res = await fakeDelay(2);
      const planWithEditedInterest = editInterestInsidePlan(interest, attractionIndex, dayIndex, plan);
      setPlan(planWithEditedInterest);
      setIsLoading(false);
      res && closeModal();
    });
  };

  return (
    <>
      <Text>{subtitle}</Text>
      <Paper withBorder shadow='md' p={30} radius='md' className={classes.card} mt={`calc(${ICON_SIZE} / 5)`}>
        <form onSubmit={handleEditInterest}>
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
              onChange={(value) => {
                form.setFieldValue('type', value || '');
                form.setFieldValue('attraction_id', '');
              }}
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
              data={
                relevantAttractions?.sort((a, b) => a.name.localeCompare(b.name)).map((item) => ({ value: String(item.id), label: item.name })) || []
              }
              transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
              {...form.getInputProps('attraction_id')}
              disabled={
                form.values.category === '' ||
                form.values.category === undefined ||
                form.values.type === '' ||
                form.values.type === undefined ||
                !categories?.data ||
                categories?.isLoading
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

export default EditInterestForm;
