'use client';
import { ActionIcon, Card, createStyles, Image, Group, Stack, Text } from '@mantine/core';
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

  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

interface AttractionTimelineItemCardProps {
  image: string;
  category: string;
  type: string;
  name: string;
}

export const AttractionTimelineItemCard = ({ image, category, type, name }: AttractionTimelineItemCardProps) => {
  const { classes } = useStyles();

  return (
    <Card withBorder radius='md' mt='xs' p={0}>
      <Group position='apart' align='flex-start'>
        <Stack align='flex-start' spacing='xs' pl='xs' pt='xs'>
          <Text size='xs' color='dimmed' className={classes.title}>
            Restaurant
          </Text>
          <Text className={classes.value}>La Piazza</Text>
          <Text color={'teal'} fz='sm' fw={500} className={classes.diff}>
            <span>08:00 - 09:00</span>
          </Text>
          <Group className={classes.icon} spacing='sm'>
            <ActionIcon variant='outline'>
              <IconArrowGuide size='1rem' />
            </ActionIcon>
            <ActionIcon variant='outline'>
              <IconEye size='1rem' />
            </ActionIcon>
            <ActionIcon variant='outline'>
              <IconDots size='1rem' />
            </ActionIcon>
          </Group>
        </Stack>
        <Image src={'../../../assets/attractions/food-and-drinks/rome/0.jpg'} height={125} width={125} alt='cover' />
      </Group>
    </Card>
  );
};
