import { NextRequest, NextResponse } from 'next/server';
import type { Plan } from '../../../../../types/general';

// function getDates(startDate: Date, endDate: Date, interval: number) {
//   const duration = endDate - startDate;
//   const steps = duration / interval;
//   return Array.from({ length: steps + 1 }, (v, i) => new Date(startDate.valueOf() + interval * i));
// }
const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;

const days = Array.from({ length: new Date('2023-05-03').getTime() / day - new Date('2023-04-28').getTime() / day }, (v, i) => {
  return {
    index: i,
    date: new Date('2023-04-28'),
  };
});

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  const id = context.params.id;
  return NextResponse.json({
    id: id,
    name: 'ppp',
    country: 107,
    city: 59582,
    countryName: 'Italy',
    cityName: 'Rome',
    startDate: new Date('2023-04-28'),
    endDate: new Date('2023-05-21'),
    // days: Array.from({ length: new Date('2023-04-28').getUTCDate() - new Date('2023-05-21').getUTCDate() }, (v, i) => {
    //   return {
    //     index: i,
    //     date: new Date('2023-04-28'),
    //     // interests: [],
    //   };
    // }),
    days: days,
  } as Plan);
}
