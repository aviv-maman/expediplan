'use client';
import { Timeline } from '@mantine/core';
import { DayTimelineItemCard } from './DayTimelineItemCard';
import { useEffect, useState } from 'react';
import { Icon3dCubeSphere } from '@tabler/icons-react';
import { attractionsFetcher, getAttractionsAPI, getAttractionsByPlanIdFromLocalStorage } from '@/api/AttractionsAPI';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { getPlanByIdAPI, getPlanByIdFromLocalStorage, planFetcher } from '@/api/PlansAPI';

interface DayTimelineProps {
  planId: string;
}

const DayTimeline: React.FC<DayTimelineProps> = ({ planId }) => {
  const session = useSession();
  const { data: planFromServer } = useSWR(session.data?.user?.id ? getPlanByIdAPI(Number(planId)) : null, planFetcher, { suspense: true });
  const plan = planFromServer ? planFromServer : getPlanByIdFromLocalStorage(planId);
  const days = plan?.days;
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    let startDate = new Date();
    if (plan?.startDate) {
      startDate = new Date(plan?.startDate);
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
  }, [days]);

  const attractionIds = getAttractionsByPlanIdFromLocalStorage(String(planId));
  const attractions = useSWR(getAttractionsAPI(attractionIds), attractionsFetcher);
  const findAttractionById = (id: number) => {
    return attractions?.data?.find((attraction) => attraction.id === id);
  };

  return (
    <Timeline active={activeItem} bulletSize={30}>
      {days?.map((item) => (
        <Timeline.Item key={item.index} bullet={<Icon3dCubeSphere size={20} />} pt={5}>
          <DayTimelineItemCard
            date={new Date(item.date)}
            firstInterestName={findAttractionById(Number(item.interests?.[0]?.attraction_id))?.name}
            lastInterestName={findAttractionById(Number(item.interests?.[item.interests.length - 1]?.attraction_id))?.name}
            dayIndex={item.index}
          />
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default DayTimeline;
