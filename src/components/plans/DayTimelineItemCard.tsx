'use client';
import { createStyles, Card, Image, Text, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCalendar } from '@tabler/icons-react';
import dayjs from 'dayjs';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    cursor: 'pointer',
  },
  body: {
    padding: theme.spacing.md,
  },
}));

interface DayTimelineItemCardProps {
  image: Date;
  firstInterestName?: string;
  lastInterestName?: string;
  title: string;
}

export function DayTimelineItemCard({ image, firstInterestName, lastInterestName, title }: DayTimelineItemCardProps) {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title={title} centered>
        <Text>Modal content</Text>
      </Modal>

      <Card onClick={open} withBorder radius='md' p={0} className={classes.card} mt={'xs'}>
        <Group noWrap spacing={0}>
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
        </Group>
      </Card>
    </>
  );
}
