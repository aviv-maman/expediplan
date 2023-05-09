'use client';
import { ActionIcon, Card, createStyles, Group, Menu, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCalendar, IconCloud, IconDots, IconEye, IconPlus } from '@tabler/icons-react';
import dayjs from 'dayjs';
import NewInterestForm from './NewInterestForm';
import AttractionTimeline from './AttractionTimeline';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },
  body: {
    padding: theme.spacing.md,
  },
  menu: {
    alignSelf: 'flex-start',
  },
  ring: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.fn.smallerThan('xs')]: {
      justifyContent: 'center',
      marginTop: theme.spacing.md,
    },
  },
}));

interface DayTimelineItemCardProps {
  date: Date;
  firstInterestName?: string;
  lastInterestName?: string;
  dayIndex: number;
}

export function DayTimelineItemCard({ date, firstInterestName, lastInterestName, dayIndex }: DayTimelineItemCardProps) {
  const { classes } = useStyles();
  const [openedNewInterest, newInterestModal] = useDisclosure(false);
  const [openedFullDay, fullDayModal] = useDisclosure(false);

  return (
    <>
      <Modal opened={openedNewInterest} onClose={newInterestModal.close} title={'New Interest'} centered id={'new-interest'}>
        <NewInterestForm
          dayIndex={dayIndex}
          subtitle={`${`Day ${dayIndex + 1}`}: ${dayjs(date).format('DD/MM/YYYY')}`}
          closeModal={newInterestModal.close}
        />
      </Modal>

      <Modal opened={openedFullDay} onClose={fullDayModal.close} title={'Quick View'} centered id={'quick-view'}>
        <AttractionTimeline dayIndex={dayIndex} date={date} />
      </Modal>

      <Card withBorder p='sm' radius='md' className={classes.card}>
        <Group position='apart'>
          <Text fz='md' display='flex' align='justify' fw={600}>
            <IconCalendar size='1.5rem' />
            &nbsp;{`${`Day ${dayIndex + 1}`}`}
            <Text display='flex' align='justify'>
              : {dayjs(date).format('MMM DD')}
            </Text>
          </Text>

          <Group>
            <Menu shadow='md' width={200} withinPortal position='bottom-end'>
              <div className={classes.menu}>
                <Menu.Target>
                  <ActionIcon variant='default'>
                    <IconDots size='1rem' />
                  </ActionIcon>
                </Menu.Target>
              </div>

              <Menu.Dropdown>
                <Menu.Label>General</Menu.Label>
                <Menu.Item onClick={fullDayModal.open} icon={<IconEye size={14} />} disabled={!firstInterestName}>
                  Quick View
                </Menu.Item>
                <Menu.Item icon={<IconCloud size={14} />}>Check Weather</Menu.Item>
                <Menu.Divider />
                <Menu.Label>Actions</Menu.Label>
                <Menu.Item onClick={newInterestModal.open} icon={<IconPlus size={14} />}>
                  Add New Interest
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>

        <div className={classes.body}>
          <Group spacing={0} sx={{ flexDirection: 'column' }}>
            <Text transform='uppercase' color='dimmed' weight={700} size='xs'>
              Start of Day
            </Text>
            {firstInterestName ? <Text size='xs'>{firstInterestName}</Text> : !firstInterestName && <Text size='xs'>No interests yet</Text>}
            <br />
            <Text transform='uppercase' color='dimmed' weight={700} size='xs'>
              End of Day
            </Text>
            {lastInterestName ? <Text size='xs'>{lastInterestName}</Text> : !lastInterestName && <Text size='xs'>No interests yet</Text>}
          </Group>
        </div>
      </Card>
    </>
  );
}
