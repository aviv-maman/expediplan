'use client';
import { removeInterestFromDayInsidePlan } from '@/api/AttractionsAPI';
import { ActionIcon, Card, createStyles, Image, Group, Text, rem, Menu, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowGuide, IconDots, IconEdit, IconInfoSquareFilled, IconMessage2, IconTrash } from '@tabler/icons-react';
import EditInterestForm from './EditInterestForm';
import dayjs from 'dayjs';
import { Suspense } from 'react';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { getPlanByIdAPI, getPlanByIdFromLocalStorage, planFetcher } from '@/api/PlansAPI';

const useStyles = createStyles((theme) => ({
  diff: {
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
  },
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${theme.spacing.sm}`,
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },
  menu: {
    alignSelf: 'flex-start',
  },
}));

interface AttractionTimelineItemCardProps {
  type?: string;
  name?: string;
  time?: string;
  image?: string;
  dayIndex: number;
  planId: string;
  attractionIndex: number;
}

export const AttractionTimelineItemCard = ({ type, name, time, image, dayIndex, planId, attractionIndex }: AttractionTimelineItemCardProps) => {
  const { classes } = useStyles();
  const session = useSession();
  const { data: planFromServer } = useSWR(session.data?.user?.id ? getPlanByIdAPI(Number(planId)) : null, planFetcher, { suspense: true });
  const plan = planFromServer ? planFromServer : getPlanByIdFromLocalStorage(planId);
  const [openedEditInterest, editInterestModal] = useDisclosure(false);

  const handleDeleteInterest = () => {
    if (!plan) return;
    const planWithoutInterest = removeInterestFromDayInsidePlan(attractionIndex, dayIndex, plan);
    // setPlan(planWithoutInterest);
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Modal opened={openedEditInterest} onClose={editInterestModal.close} title={'Edit Interest'} centered id={'edit-interest'}>
          <EditInterestForm
            dayIndex={dayIndex}
            subtitle={`${`Day ${dayIndex + 1}`}: ${dayjs(image).format('DD/MM/YYYY')}`}
            closeModal={editInterestModal.close}
            attractionIndex={attractionIndex}
          />
        </Modal>
      </Suspense>

      <Card withBorder padding='lg' className={classes.card}>
        <Card.Section>
          <Image src={image} alt='cover' height={100} />
        </Card.Section>
        <Text mt='xs' fz='sm' fw={700}>
          {name}
        </Text>
        <Group position='apart'>
          <Text mt='sm' mb='md' fz='xs' fw={500} color={'teal'} className={classes.diff}>
            {time}
          </Text>
          <Text fz='xs' c='dimmed'>
            {type}
          </Text>
        </Group>
        <Card.Section className={classes.footer}>
          <Button variant='default' leftIcon={<IconArrowGuide size='1rem' />}>
            Navigate
          </Button>
          <Button variant='default' leftIcon={<IconInfoSquareFilled size='1.1rem' />}>
            Info
          </Button>

          <Menu shadow='md' width={200} withinPortal position='bottom-end'>
            <div className={classes.menu}>
              <Menu.Target>
                <ActionIcon variant='default' size={36}>
                  <IconDots size='1rem' />
                </ActionIcon>
              </Menu.Target>
            </div>

            <Menu.Dropdown>
              <Menu.Label>General</Menu.Label>
              <Menu.Item icon={<IconMessage2 size={14} />}>Add Comment</Menu.Item>
              <Menu.Divider />
              <Menu.Label>Actions</Menu.Label>
              <Menu.Item icon={<IconEdit size={14} />} onClick={editInterestModal.open}>
                Edit Interest
              </Menu.Item>
              <Menu.Item icon={<IconTrash size={14} />} onClick={handleDeleteInterest}>
                Delete Interest
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Card.Section>
      </Card>
    </>
  );
};
