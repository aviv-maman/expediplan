'use client';
import { Avatar, Box, Button, Group, Paper, Select, TextInput, Title, createStyles, rem } from '@mantine/core';
import { hasLength, isNotEmpty, useForm } from '@mantine/form';
import { IconBuilding, IconCalendar, IconFlag, IconFlagFilled, IconId } from '@tabler/icons-react';
import DropdownWithIcon from '../DropdownWithIcon';
import type { Plan } from '../../../types/general';
import useSWR from 'swr';
import { DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { Suspense, useEffect, useState } from 'react';
import { countriesFetcher, getCountriesAPI } from '@/api/CountriesAPI';
import { citiesFetcher, cityFetcher, getCitiesByCountryIdAPI, getCityByIdAPI } from '@/api/CitiesAPI';
import { useParams, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  editPlanOnLocalStorage,
  editPlanOnServer,
  getPlanByIdAPI,
  getPlanByIdFromLocalStorage,
  planFetcher,
  savePlanToLocalStorage,
  uploadPlanToServer,
} from '@/api/PlansAPI';

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

interface EditPlanFormProps {
  closeModal: () => void;
}

const EditPlanForm: React.FC<EditPlanFormProps> = ({ closeModal }) => {
  const { classes } = useStyles();

  const { data: session } = useSession();
  const planId = useParams().id;
  const { data: planFromServer, isLoading: isLoadingPlan } = useSWR(session?.user?.id ? getPlanByIdAPI(Number(planId)) : null, planFetcher, {
    suspense: true,
  });
  const plan = planFromServer ? planFromServer : getPlanByIdFromLocalStorage(planId);
  const city = useSWR(getCityByIdAPI(Number(plan?.city)), cityFetcher, { suspense: true });
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: plan?.name || '',
      // country: { id: '', flag: '' },
      // city: '',
      // startDate: undefined,
      // endDate: undefined,
      // countryName: '',
      // cityName: '',
    },
    validate: {
      name: isNotEmpty('Enter a name for your plan') && hasLength({ min: 3 }, 'Name must have 3 or more characters'),
      // country: isNotEmpty('Country is required'),
      // city: isNotEmpty('City is required'),
    },

    transformValues: (values) => ({
      ...values,
      // country: Number(values.country.id) || 0,
      // city: Number(values.city) || 0,
      // startDate: new Date(dayjs(values.startDate).format('YYYY-MM-DD') || 0), //dayjs(values.startDate).format('YYYY-MM-DD')
      // endDate: new Date(dayjs(values.endDate).format('YYYY-MM-DD') || 0), //values.endDate.toISOString().split('T')[0]
    }),
  });

  const searchParams = useSearchParams();

  const countries = useSWR(getCountriesAPI(), countriesFetcher);
  // const cities = useSWR(getCitiesByCountryIdAPI(form.getTransformedValues().country), citiesFetcher);

  // const duration = dayjs(form.values.endDate).diff(dayjs(form.values.startDate), 'day') + 1;

  //===[ Create new plan from search params ]===
  // const flag = countries.data?.find((item) => item.id === Number(form.values.country.id))?.flag;
  useEffect(() => {
    if (searchParams.get('country')) {
      form.setFieldValue('country.id', searchParams.get('country') || '');
    }
    if (searchParams.get('city')) {
      form.setFieldValue('city', searchParams.get('city') || '');
    }
  }, []);
  //===========================================

  if (countries.error) return <div>Failed to load</div>;
  // if (cities.error) return <div>Failed to load</div>;

  // if (countries.isLoading) return <div>Loading...</div>;
  // if (cities.isLoading) return <div>Loading...</div>;

  return (
    <Box maw={300} mx='auto'>
      <Title align='center' sx={(theme) => ({ fontWeight: 700, color: theme.colors.red[3] })}>
        Edit Plan
      </Title>
      <Paper withBorder shadow='md' p={30} radius='md' className={classes.card} mt={`calc(${ICON_SIZE} / 3)`}>
        {/* <Avatar src={form.values.country.flag || flag} alt='flag' className={classes.icon} size={ICON_SIZE} radius={ICON_SIZE} color='blue'>
          <IconFlagFilled size='2rem' stroke={1.5} />
        </Avatar> */}
        <form
          onSubmit={form.onSubmit(async (values) => {
            setIsLoading(true);
            session?.user?.email
              ? await editPlanOnServer(Number(planId), { name: values.name })
              : editPlanOnLocalStorage(planId, { name: values.name });
            setIsLoading(false);
            closeModal();
          })}>
          <TextInput required minLength={3} label='Name' placeholder='Name of plan' icon={<IconId size='1rem' />} {...form.getInputProps('name')} />

          <Group position='right' mt='md'>
            <Button type='submit' loading={isLoading} disabled={isLoadingPlan}>
              Edit
            </Button>
          </Group>
        </form>
      </Paper>
    </Box>
  );
};

export default EditPlanForm;
