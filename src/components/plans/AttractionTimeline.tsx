'use client';
import { Timeline } from '@mantine/core';
import { IconAB2 } from '@tabler/icons-react';
import type { Plan } from '../../../types/general';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AttractionTimelineItemCard } from './AttractionTimelineItemCard';
import { attractionsFetcher, getAttractionsAPI, getAttractionsByPlanIdFromLocalStorage } from '@/api/AttractionsAPI';
import useSWR from 'swr';
import { getPlanByIdFromLocalStorage } from '@/api/PlansAPI';

interface AttractionTimelineProps {
  dayIndex: number;
  planFromServer?: Plan;
  date: Date;
}

const AttractionTimeline: React.FC<AttractionTimelineProps> = ({ dayIndex, planFromServer, date }) => {
  const params = useParams();
  const plan = planFromServer ? planFromServer : getPlanByIdFromLocalStorage(String(params?.id));
  const interests = plan?.days[dayIndex]?.interests || planFromServer?.days[dayIndex]?.interests;

  const attractionIds = getAttractionsByPlanIdFromLocalStorage(String(params?.id));
  const attractions = useSWR(getAttractionsAPI(attractionIds), attractionsFetcher);

  const interestsWithAttractions = interests?.map((interest) => {
    const attraction = attractions?.data?.find((attraction) => attraction.id === interest.attraction_id);
    return { ...interest, details: attraction };
  });

  const [activeItem, setActiveItem] = useState(0);

  const arrayOfStartTimes = interestsWithAttractions?.map((item) => item.startTime);

  useEffect(() => {
    const today = new Date();
    if (today > date) {
      setActiveItem(attractionIds?.length - 1);
      return;
    }
    if (date < today) {
      setActiveItem(-1);
      return;
    }
    const currentTimeString = today.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    const currentTimeNumber = Number(currentTimeString.replace(':', ''));
    const arrayOfStartTimesAsNumbers = arrayOfStartTimes?.map((time) => Number(time.replace(':', '')));
    const index = arrayOfStartTimesAsNumbers?.findIndex((num) => num > currentTimeNumber);
    setActiveItem(Number(index));
  }, []);

  if (!interestsWithAttractions) return null;

  return (
    <Timeline active={activeItem} bulletSize={30} color='cyan'>
      {interestsWithAttractions?.map((item, index) => (
        <Timeline.Item key={index} lineVariant='dashed' bullet={<IconAB2 size={20} />} pt={5}>
          <AttractionTimelineItemCard
            type={item.details?.type}
            name={item.details?.name}
            time={item.startTime + ' - ' + item.endTime}
            image={item.details?.cover_image}
            dayIndex={dayIndex}
            planId={String(params?.id)}
            attractionIndex={index}
          />
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default AttractionTimeline;
