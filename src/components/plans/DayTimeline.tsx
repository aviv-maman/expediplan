'use client';
import { Timeline } from '@mantine/core';
import { IconGitBranch } from '@tabler/icons-react';
import { TimelineItemCard } from './TimelineItemCard';
import type { Plan } from '../../../types/general';

interface DayTimelineProps {
  startDate: Plan['startDate'];
  endDate: Plan['endDate'];
  items: Plan['days'];
}

const DayTimeline: React.FC<DayTimelineProps> = ({ startDate, endDate, items }) => {
  if (!startDate) {
    startDate = new Date('2023-04-29');
  }
  if (!endDate) {
    endDate = new Date('2023-04-29');
  }
  if (!items)
    items = [
      {
        index: 0,
        date: new Date('2023-04-29'),
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
              address: 'Via del Corso, 82, 00186 Roma RM, Italy',
              latitude: 41.897,
              longitude: 12.492,
              about:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt luctus, nunc nisl aliquam nisl, eget aliquam nunc nisl euismod nisl. Sed euismod, nisl vel tincidunt luctus, nunc nisl aliquam nisl, eget aliquam nunc nisl euismod nisl.',
              rating: 4.5,
              images: [''],
              tags: [''],
              contact: { phone: '1234567890', email: '', website: '' },
              openingHoursPeriods: [{ close: { day: 0, time: '23:00' }, open: { day: 0, time: '08:00' } }],
            },
          },
        ],
      },
    ];

  return (
    <Timeline active={1} bulletSize={30}>
      <Timeline.Item bullet={<IconGitBranch size={12} />} title={`Day ${items[0].index + 1}`} pt={5}>
        <TimelineItemCard image={items[0].date} category={'Food & Drinks'} type={'Restaurant'} date={new Date('2023-04-29')} name={'Day Name'} />
      </Timeline.Item>
    </Timeline>
  );
};

export default DayTimeline;
