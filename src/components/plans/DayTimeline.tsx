'use client';
import { Timeline } from '@mantine/core';
import { IconGitBranch } from '@tabler/icons-react';
import { TimelineItemCard } from './TimelineItemCard';
import type { Plan } from '../../../types/general';
import { useRecoilValue } from 'recoil';
import { planSelectorFamily } from '@/recoil/plan_state';

interface DayTimelineProps {
  startDate_Server?: Plan['startDate'];
  endDate_Server?: Plan['endDate'];
  items_Server?: Plan['days'];
  id_localStorage?: string;
}

const DayTimeline: React.FC<DayTimelineProps> = ({ startDate_Server, endDate_Server, items_Server, id_localStorage }) => {
  const planFromLocalStorage = useRecoilValue(planSelectorFamily(String(id_localStorage)));
  const items = planFromLocalStorage?.days ?? items_Server;

  return (
    <Timeline active={1} bulletSize={30}>
      {items?.map((item, index) => (
        <Timeline.Item key={index} bullet={<IconGitBranch size={12} />} title={`Day ${index + 1}`} pt={5}>
          <TimelineItemCard image={new Date(item.date)} startDate={items[0].date} endDate={items[items.length - 1].date} />
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default DayTimeline;
