'use client';
import { planSelectorFamily } from '@/recoil/plan_state';
import { ActionIcon, Button, Group, Paper, Text, TextInput, createStyles, rem } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconBrowserPlus, IconClock, IconIdBadge } from '@tabler/icons-react';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import type { Interest, Plan } from '../../../types/general';
import { fakeDelay } from '@/helpers/network';
import { addInterestToDayInsidePlan } from '@/api/AttractionsAPI';

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
      attraction_id: '',
      startTime: '',
      endTime: '',
    },

    transformValues: (values) => ({
      ...values,
      attraction_id: Number(values.attraction_id) || 0,
    }),
  });

  const params = useParams();
  const [plan, setPlan] = useRecoilState(planSelectorFamily(params.id));
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Text>{subtitle}</Text>
      <Paper withBorder shadow='md' p={30} radius='md' className={classes.card} mt={`calc(${ICON_SIZE} / 5)`}>
        <form
          onSubmit={form.onSubmit(async (interest) => {
            if (!plan) return;
            setIsLoading(true);
            const res = await fakeDelay(2);
            const planWithInterest = addInterestToDayInsidePlan(interest, dayIndex, plan);
            setPlan(planWithInterest);
            setIsLoading(false);
            res && closeModal();
          })}>
          <TextInput
            required
            label='Attraction'
            placeholder='Choose attraction'
            icon={<IconIdBadge size='1rem' />}
            {...form.getInputProps('attraction_id')}
          />

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
