'use client';
import { Box, Button, Group, Paper, TextInput, Title, createStyles, rem } from '@mantine/core';
import { hasLength, isNotEmpty, useForm } from '@mantine/form';
import { IconId } from '@tabler/icons-react';
import useSWR from 'swr';
import { useState } from 'react';
import { countriesFetcher, getCountriesAPI } from '@/api/CountriesAPI';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { editPlanOnLocalStorage, editPlanOnServer, getPlanByIdAPI, getPlanByIdFromLocalStorage, planFetcher } from '@/api/PlansAPI';

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
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: plan?.name || '',
    },
    validate: {
      name: isNotEmpty('Enter a name for your plan') && hasLength({ min: 3 }, 'Name must have 3 or more characters'),
    },

    transformValues: (values) => ({
      ...values,
    }),
  });

  const countries = useSWR(getCountriesAPI(), countriesFetcher);

  if (countries.error) return <div>Failed to load</div>;

  return (
    <Box maw={300} mx='auto'>
      <Title align='center' sx={(theme) => ({ fontWeight: 700, color: theme.colors.red[3] })}>
        Edit Plan
      </Title>
      <Paper withBorder shadow='md' p={30} radius='md' className={classes.card} mt={`calc(${ICON_SIZE} / 3)`}>
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
