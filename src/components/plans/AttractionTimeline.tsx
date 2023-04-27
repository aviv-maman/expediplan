'use client';
import { Timeline } from '@mantine/core';
import { IconGitBranch } from '@tabler/icons-react';
import { TimelineItemCard } from './TimelineItemCard';
import type { Plan } from '../../../types/general';

interface AttractionTimelineProps {
  items: Plan['days'];
}

const AttractionTimeline: React.FC<AttractionTimelineProps> = ({ items }) => {
  if (!items)
    items = [
      {
        index: 0,
        date: new Date('2023-05-10'),
        interests: [
          {
            startTime: '08:00',
            endTime: '09:00',
            attraction: {
              id: '1',
              name: 'La Piazza',
              cover_image: '../../../assets/attractions/food-and-drinks/rome/0.jpg',
              category: 'Food & Drinks',
              type: 'Restaurant',
            },
          },
        ],
      },
    ] as Plan['days'];

  return (
    <Timeline active={1} bulletSize={30}>
      <Timeline.Item bullet={<IconGitBranch size={12} />} title={'La Piazza'} pt={5}>
        <TimelineItemCard
          image={'../../../assets/attractions/food-and-drinks/rome/0.jpg'}
          category={'Food & Drinks'}
          type={'Restaurant'}
          date={new Date('2023-05-10')}
          name={'08:00 - 09:00'}
        />
      </Timeline.Item>
    </Timeline>
  );
};

export default AttractionTimeline;
