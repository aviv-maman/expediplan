'use client';
import { Timeline } from '@mantine/core';
import { IconGitBranch } from '@tabler/icons-react';
import { TimelineItemCard } from './TimelineItemCard';
import type { Interest } from '../../../types/general';

interface AttractionTimelineProps {
  interests?: Interest[];
  id_localStorage?: string;
}

const AttractionTimeline: React.FC<AttractionTimelineProps> = ({ id_localStorage, interests }) => {
  return (
    <Timeline active={1} bulletSize={30}>
      <Timeline.Item bullet={<IconGitBranch size={12} />} title={'La Piazza'} pt={5}>
        <TimelineItemCard
          image={'../../../assets/attractions/food-and-drinks/rome/0.jpg'}
          category={'Food & Drinks'}
          type={'Restaurant'}
          name={'08:00 - 09:00'}
        />
      </Timeline.Item>

      <Timeline.Item bullet={<IconGitBranch size={12} />} title={'La Piazza'} pt={5}>
        <TimelineItemCard
          image={'../../../assets/attractions/food-and-drinks/rome/0.jpg'}
          category={'Food & Drinks'}
          type={'Restaurant'}
          name={'08:00 - 09:00'}
        />
      </Timeline.Item>

      <Timeline.Item bullet={<IconGitBranch size={12} />} title={'La Piazza'} pt={5}>
        <TimelineItemCard
          image={'../../../assets/attractions/food-and-drinks/rome/0.jpg'}
          category={'Food & Drinks'}
          type={'Restaurant'}
          name={'08:00 - 09:00'}
        />
      </Timeline.Item>
    </Timeline>
  );
};

export default AttractionTimeline;
