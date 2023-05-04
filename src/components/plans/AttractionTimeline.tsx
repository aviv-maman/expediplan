'use client';
import { Timeline } from '@mantine/core';
import { IconAB2 } from '@tabler/icons-react';
import type { Plan } from '../../../types/general';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { planSelectorFamily } from '@/recoil/plan_state';
import { AttractionTimelineItemCard } from './AttractionTimelineItemCard';
import { attractionsFetcher, getAttractionsAPI, getAttractionsByPlanIdFromLocalStorage } from '@/api/AttractionsAPI';
import useSWR from 'swr';

interface AttractionTimelineProps {
  dayIndex: number;
  planFromServer?: Plan;
}

const AttractionTimeline: React.FC<AttractionTimelineProps> = ({ dayIndex, planFromServer }) => {
  const params = useParams();
  const planFromLocalStorage = useRecoilValue(planSelectorFamily(params.id));
  const interests = planFromLocalStorage?.days[dayIndex]?.interests || planFromServer?.days[dayIndex]?.interests;

  const attractionIds = getAttractionsByPlanIdFromLocalStorage(params.id);
  const attractions = useSWR(getAttractionsAPI(attractionIds), attractionsFetcher);

  const interestsWithAttractions = interests?.map((interest) => {
    const attraction = attractions?.data?.find((attraction) => attraction.id === interest.attraction_id);
    return { ...interest, details: attraction };
  });

  const [activeItem, setActiveItem] = useState(0);

  if (!interestsWithAttractions) return null;

  return (
    <Timeline active={activeItem} bulletSize={30} color='indigo'>
      {interestsWithAttractions?.map((item, index) => (
        <Timeline.Item key={index} lineVariant='dashed' bullet={<IconAB2 size={20} />} pt={5}>
          <AttractionTimelineItemCard
            type={item.details?.type}
            name={item.details?.name}
            time={item.startTime + ' - ' + item.endTime}
            image={item.details?.cover_image}
          />
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default AttractionTimeline;
