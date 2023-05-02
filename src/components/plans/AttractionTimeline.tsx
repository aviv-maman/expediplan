'use client';
import { Timeline } from '@mantine/core';
import { IconAB2 } from '@tabler/icons-react';
import type { Plan } from '../../../types/general';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { planSelectorFamily } from '@/recoil/plan_state';
import { AttractionTimelineItemCard } from './AttractionTimelineItemCard';

interface AttractionTimelineProps {
  dayIndex: number;
  planFromServer?: Plan;
}

const AttractionTimeline: React.FC<AttractionTimelineProps> = ({ dayIndex, planFromServer }) => {
  const params = useParams();
  const planFromLocalStorage = useRecoilValue(planSelectorFamily(params.id));
  const interests = planFromLocalStorage?.days[dayIndex]?.interests || planFromServer?.days[dayIndex]?.interests;
  const [activeItem, setActiveItem] = useState(0);

  return (
    <Timeline active={1} bulletSize={30} color='indigo'>
      <Timeline.Item lineVariant='dashed' bullet={<IconAB2 size={20} />} title={'La Piazza'} pt={5}>
        <AttractionTimelineItemCard
          image={'../../../assets/attractions/food-and-drinks/rome/0.jpg'}
          category={'Food & Drinks'}
          type={'Restaurant'}
          name={'08:00 - 09:00'}
        />
      </Timeline.Item>

      <Timeline.Item lineVariant='dashed' bullet={<IconAB2 size={20} />} title={'La Piazza'} pt={5}>
        <AttractionTimelineItemCard
          image={'../../../assets/attractions/food-and-drinks/rome/0.jpg'}
          category={'Food & Drinks'}
          type={'Restaurant'}
          name={'08:00 - 09:00'}
        />
      </Timeline.Item>

      <Timeline.Item lineVariant='dashed' bullet={<IconAB2 size={20} />} title={'La Piazza'} pt={5}>
        <AttractionTimelineItemCard
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
