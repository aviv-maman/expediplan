'use client';
import { createStyles, Card, Image, Text, Group } from '@mantine/core';

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

interface AttractionTimelineItemCardProps {
  image: string;
  category: string;
  type: string;
  name: string;
}

export function AttractionTimelineItemCard({ image, category, type, name }: AttractionTimelineItemCardProps) {
  const { classes } = useStyles();

  return (
    <Card withBorder radius='md' p={0} className={classes.card} mt={'xs'}>
      <Group noWrap spacing={0}>
        <Image src={image} height={140} width={140} alt={name} />
        <div className={classes.body}>
          <Text transform='uppercase' color='dimmed' weight={700} size='xs'>
            {category}
          </Text>
          <Text className={classes.title} mt='xs' mb='md'>
            {type}
          </Text>
          <Group spacing={0} sx={{ flexDirection: 'column' }}>
            <Text size='xs'>{name}</Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
}
