'use client';
import { ActionIcon, Card, createStyles, Group, Image, Menu, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCalendar, IconDots, IconEye, IconPlus } from '@tabler/icons-react';
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
  group: {
    gap: 0,
    paddingRight: theme.spacing.md,
    justifyContent: 'space-between',
  },
  menu: {
    alignSelf: 'flex-start',
    paddingTop: theme.spacing.md,
  },
}));

interface DayTimelineItemCardProps {
  image: Date;
  firstInterestName?: string;
  lastInterestName?: string;
  dayIndex: number;
}

export function DayTimelineItemCard({ image, firstInterestName, lastInterestName, dayIndex }: DayTimelineItemCardProps) {
  const { classes } = useStyles();
  const [openedNewInterest, newInterestModal] = useDisclosure(false);
  const [openedFullDay, fullDayModal] = useDisclosure(false);

  return (
    <>
      <Modal opened={openedNewInterest} onClose={newInterestModal.close} title={'New Interest'} centered id={'new-interest'}>
        <NewInterestForm
          dayIndex={dayIndex}
          subtitle={`${`Day ${dayIndex + 1}`}: ${dayjs(image).format('DD/MM/YYYY')}`}
          closeModal={newInterestModal.close}
        />
      </Modal>

      <Modal opened={openedFullDay} onClose={fullDayModal.close} title={'Quick View'} centered id={'quick-view'}>
        <AttractionTimeline dayIndex={dayIndex} />
      </Modal>

      <Card withBorder radius='md' p={0} className={classes.card} mt={'xs'}>
        <Group noWrap className={classes.group}>
          <Image
            src={null}
            height={140}
            width={140}
            alt={dayjs(image).format('MMM DD')}
            withPlaceholder
            placeholder={
              <Text display='flex' align='justify'>
                <IconCalendar size='1.5rem' />
                &nbsp;{dayjs(image).format('MMM DD')}
              </Text>
            }
          />
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
              <Menu.Divider />
              <Menu.Label>Actions</Menu.Label>
              <Menu.Item onClick={newInterestModal.open} icon={<IconPlus size={14} />}>
                Add New Interest
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card>
    </>
  );
}
