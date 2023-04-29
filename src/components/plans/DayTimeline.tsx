'use client';
import { Timeline } from '@mantine/core';
import { IconGitBranch } from '@tabler/icons-react';
import { TimelineItemCard } from './TimelineItemCard';
import type { Plan } from '../../../types/general';
import { useRecoilValue } from 'recoil';
import { planSelectorFamily } from '@/recoil/plan_state';
import { useEffect, useState } from 'react';

interface DayTimelineProps {
  startDate_Server?: Plan['startDate'];
  endDate_Server?: Plan['endDate'];
  items_Server?: Plan['days'];
  id_localStorage?: string;
}

const DayTimeline: React.FC<DayTimelineProps> = ({ startDate_Server, endDate_Server, items_Server, id_localStorage }) => {
  const planFromLocalStorage = useRecoilValue(planSelectorFamily(String(id_localStorage)));
  const days = planFromLocalStorage?.days ?? items_Server;
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    let startDate = new Date();
    if (planFromLocalStorage?.startDate) {
      startDate = new Date(planFromLocalStorage?.startDate);
    } else if (startDate_Server) {
      startDate = new Date(startDate_Server);
    }
    const today = new Date();
    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const index = diffDays - 1;

    //Date is before start date
    if (index < 0) {
      setActiveItem(0);
      return;
    }

    //Date is after end date
    if (days?.length && index > 0 && index >= days?.length) {
      setActiveItem(days?.length);
      return;
    }

    //Date is between start and end date
    setActiveItem(index);
  }, []);

  return (
    <Timeline active={activeItem} bulletSize={30}>
      {days?.map((item) => (
        <Timeline.Item key={item.index} bullet={<IconGitBranch size={12} />} title={`Day ${item.index + 1}`} pt={5}>
          <TimelineItemCard image={new Date(item.date)} firstInterestName={item.interests?.[0].attraction.name} />
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default DayTimeline;
