'use client';
import { Text, Timeline } from '@mantine/core';
import { IconGitBranch, IconGitCommit, IconGitPullRequest, IconMessageDots } from '@tabler/icons-react';
import { TimelineItemCard } from './TimelineItemCard';
import type { Plan } from '../../../types/general';

interface DayTimelineProps {
  items: Plan['days'];
}

const DayTimeline: React.FC<DayTimelineProps> = ({ items }) => {
  if (!items)
    items = [
      {
        index: 0,
        date: '28/04/2023',
        interests: [{ startTime: '08:00', endTime: '09:00', attraction: { id: '1', cover_image: '', category: 'Food' } }],
      },
    ] as Plan['days'];

  return (
    <Timeline active={1} bulletSize={30}>
      <Timeline.Item bullet={<IconGitBranch size={12} />} title='La Piazza'>
        <TimelineItemCard
          image={items[0].interests[0].attraction.cover_image}
          category={items[0].interests[0].attraction.category}
          title={items[0].interests[0].endTime}
          date={items[0].date}
          name={items[0].interests[0].attraction.name}
        />
      </Timeline.Item>

      <Timeline.Item bullet={<IconGitCommit size={12} />} title='City Hall'>
        <Text color='dimmed' size='sm'>
          You&apos;ve pushed 23 commits to
          <Text variant='link' component='span' inherit>
            fix-notifications branch
          </Text>
        </Text>
        <Text size='xs' mt={4}>
          52 minutes ago
        </Text>
      </Timeline.Item>

      <Timeline.Item title='Museum' bullet={<IconGitPullRequest size={12} />} lineVariant='dashed'>
        <Text color='dimmed' size='sm'>
          You&apos;ve submitted a pull request
          <Text variant='link' component='span' inherit>
            Fix incorrect notification message (#187)
          </Text>
        </Text>
        <Text size='xs' mt={4}>
          34 minutes ago
        </Text>
      </Timeline.Item>

      <Timeline.Item title='Dinner' bullet={<IconMessageDots size={12} />}>
        <Text color='dimmed' size='sm'>
          <Text variant='link' component='span' inherit>
            Robert Gluesticker
          </Text>{' '}
          left a code review on your pull request
        </Text>
        <Text size='xs' mt={4}>
          12 minutes ago
        </Text>
      </Timeline.Item>

      <Timeline.Item title='Dinner' bullet={<IconMessageDots size={12} />}>
        <Text color='dimmed' size='sm'>
          <Text variant='link' component='span' inherit>
            Robert Gluesticker
          </Text>{' '}
          left a code review on your pull request
        </Text>
        <Text size='xs' mt={4}>
          12 minutes ago
        </Text>
      </Timeline.Item>

      <Timeline.Item title='Dinner' bullet={<IconMessageDots size={12} />}>
        <Text color='dimmed' size='sm'>
          <Text variant='link' component='span' inherit>
            Robert Gluesticker
          </Text>{' '}
          left a code review on your pull request
        </Text>
        <Text size='xs' mt={4}>
          12 minutes ago
        </Text>
      </Timeline.Item>
    </Timeline>
  );
};

export default DayTimeline;
