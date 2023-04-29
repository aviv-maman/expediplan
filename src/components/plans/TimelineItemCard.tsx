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

interface TimelineItemCardProps {
  image: string | Date;
  category?: string;
  type?: string;
  name?: string;
  firstInterestName?: string;
  lastInterestName?: string;
}

export function TimelineItemCard({ image, category, type, name, firstInterestName, lastInterestName }: TimelineItemCardProps) {
  const { classes } = useStyles();

  return (
    <Card withBorder radius='md' p={0} className={classes.card} mt={'xs'}>
      <Group noWrap spacing={0}>
        {typeof image === 'string' ? (
          <Image src={image} height={140} width={140} alt={name} />
        ) : (
          <Image
            src={null}
            height={140}
            width={140}
            alt={name}
            withPlaceholder
            placeholder={<Text align='center'>{dayjs(image).format('MMM DD')}</Text>}
          />
        )}
        <div className={classes.body}>
          {category && (
            <Text transform='uppercase' color='dimmed' weight={700} size='xs'>
              {category}
            </Text>
          )}
          {type && (
            <Text className={classes.title} mt='xs' mb='md'>
              {type}
            </Text>
          )}
          <Group spacing={0}>
            {name && <Text size='xs'>{name}</Text>}
            {typeof image !== 'string' && (
              <Text transform='uppercase' color='dimmed' weight={700} size='xs'>
                Start of Day
              </Text>
            )}
            {typeof image !== 'string' && firstInterestName ? (
              <Text size='xs'>{firstInterestName}</Text>
            ) : (
              typeof image !== 'string' && !firstInterestName && <Text size='xs'>No interests yet</Text>
            )}

            {typeof image !== 'string' && (
              <Text transform='uppercase' color='dimmed' weight={700} size='xs'>
                End of Day
              </Text>
            )}
            {typeof image !== 'string' && lastInterestName ? (
              <Text size='xs'>{lastInterestName}</Text>
            ) : (
              typeof image !== 'string' && !lastInterestName && <Text size='xs'>No interests yet</Text>
            )}
          </Group>
        </div>
      </Group>
    </Card>
  );
}
