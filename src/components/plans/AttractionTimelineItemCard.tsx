'use client';
import { ActionIcon, Card, createStyles, Image, Group, Stack, Text, rem } from '@mantine/core';
import { IconArrowGuide, IconDots, IconEye } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  value: {
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
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
    // <Card withBorder radius='md' mt='xs' p={0}>
    //   <Group position='apart' align='flex-start'>
    //     <Stack align='flex-start' spacing='xs' pl='xs' pt='xs'>
    //       <Text size='xs' color='dimmed' className={classes.title}>
    //         {type}
    //       </Text>
    //       <Text className={classes.value}>{name}</Text>
    //       <Text color={'teal'} fz='sm' fw={500} className={classes.diff}>
    //         {time}
    //       </Text>
    //     </Stack>
    //     <Group className={classes.icon} spacing='sm'>
    //       <Image src={image} height={125} width={125} alt='cover' />
    //       <ActionIcon variant='outline'>
    //         <IconArrowGuide size='1rem' />
    //       </ActionIcon>
    //       <ActionIcon variant='outline'>
    //         <IconEye size='1rem' />
    //       </ActionIcon>
    //       <ActionIcon variant='outline'>
    //         <IconDots size='1rem' />
    //       </ActionIcon>
    //     </Group>
    //   </Group>
    // </Card>
    <Card withBorder padding='lg' className={classes.card}>
      <Card.Section>
        <Image src={image} alt='cover' height={100} />
      </Card.Section>

      <Group position='apart' mt='xs'>
        <Text fz='sm' fw={700} className={classes.title}>
          {name}
        </Text>
      </Group>
      <Text mt='sm' mb='md' fz='xs' fw={500} color={'teal'} className={classes.diff}>
        {time}
      </Text>
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
