import { NextRequest, NextResponse } from 'next/server';
import type { Plan } from '../../../../../types/general';

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  const id = context.params.id;
  return NextResponse.json({
    id: id,
    name: 'ppp',
    country: 107,
    city: 59582,
    countryName: 'Italy',
    startDate: '2023-04-28',
    endDate: '2023-05-21',
  } as Plan);
}
