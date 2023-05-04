'use client';
import { ActionIcon, Card, createStyles, Image, Group, Text, rem } from '@mantine/core';
import { IconArrowGuide, IconDots, IconEye } from '@tabler/icons-react';

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
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },
}));

interface AttractionTimelineItemCardProps {
  type: string;
  name: string;
  time: string;
  image?: string;
}

export const AttractionTimelineItemCard = ({ type, name, time, image }: AttractionTimelineItemCardProps) => {
  const { classes } = useStyles();

  return (
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
        <ActionIcon variant='outline'>
          <IconArrowGuide size='1rem' />
        </ActionIcon>
        <ActionIcon variant='outline'>
          <IconEye size='1rem' />
        </ActionIcon>
        <ActionIcon variant='outline'>
          <IconDots size='1rem' />
        </ActionIcon>
      </Card.Section>
    </Card>
  );
};
