'use client';
import { createStyles, Card, Image, Text, Group } from '@mantine/core';
import dayjs from 'dayjs';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },
  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },
  body: {
    padding: theme.spacing.md,
  },
}));

interface DayTimelineItemCardProps {
  image: Date;
  firstInterestName?: string;
  lastInterestName?: string;
}

export function DayTimelineItemCard({ image, firstInterestName, lastInterestName }: DayTimelineItemCardProps) {
  const { classes } = useStyles();

  return (
    <Card withBorder radius='md' p={0} className={classes.card} mt={'xs'}>
      <Group noWrap spacing={0}>
        <Image
          src={null}
          height={140}
          width={140}
          alt={dayjs(image).format('MMM DD')}
          withPlaceholder
          placeholder={<Text align='center'>{dayjs(image).format('MMM DD')}</Text>}
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
  );
}
