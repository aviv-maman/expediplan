'use client';
import { Timeline } from '@mantine/core';
import { DayTimelineItemCard } from './DayTimelineItemCard';
import type { Plan } from '../../../types/general';
import { useRecoilValue } from 'recoil';
import { planSelectorFamily } from '@/recoil/plan_state';
import { useEffect, useState } from 'react';
import { Icon3dCubeSphere } from '@tabler/icons-react';
import { attractionsFetcher, getAttractionsAPI, getAttractionsByPlanIdFromLocalStorage } from '@/api/AttractionsAPI';
import useSWR from 'swr';

interface DayTimelineProps {
  idFromLocalStorage?: string;
  planFromServer?: Plan;
}

const DayTimeline: React.FC<DayTimelineProps> = ({ idFromLocalStorage, planFromServer }) => {
  const planFromLocalStorage = useRecoilValue(planSelectorFamily(String(idFromLocalStorage)));
  const days = planFromLocalStorage?.days || planFromServer?.days;
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    let startDate = new Date();
    if (planFromLocalStorage?.startDate) {
      startDate = new Date(planFromLocalStorage?.startDate);
    } else if (planFromServer?.startDate) {
      startDate = new Date(planFromServer?.startDate);
    }
    const today = new Date();
    const diffTime = today.getTime() - today.getTimezoneOffset() * (1000 * 60) - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const index = diffDays - 1;

    //Date is before start date
    if (index < 0) {
      setActiveItem(0);
      return;
    }

    //Date is after end date
    if (days?.length && index > 0 && index >= days?.length) {
      setActiveItem(days?.length - 1);
      return;
    }

    //Date is between start and end date
    setActiveItem(index);
  }, []);

  const attractionIds = getAttractionsByPlanIdFromLocalStorage(String(idFromLocalStorage));
  const attractions = useSWR(getAttractionsAPI(attractionIds), attractionsFetcher);
  const findAttractionById = (id: number) => {
    return attractions?.data?.find((attraction) => attraction.id === id);
  };

  return (
    <Timeline active={activeItem} bulletSize={30}>
      {days?.map((item) => (
        <Timeline.Item key={item.index} bullet={<Icon3dCubeSphere size={20} />} title={`Day ${item.index + 1}`} pt={5}>
          <DayTimelineItemCard
            image={new Date(item.date)}
            firstInterestName={findAttractionById(Number(item.interests?.[0].attraction_id))?.name}
            lastInterestName={findAttractionById(Number(item.interests?.[item.interests.length - 1]?.attraction_id))?.name}
            dayIndex={item.index}
            activeDayIndex={activeItem}
          />
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default DayTimeline;
