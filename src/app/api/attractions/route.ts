import { NextRequest, NextResponse } from 'next/server';
import attractions from '@/attractions.json';
import type { Attraction } from '../../../../types/general';

export async function GET(request: NextRequest) {
  const ids = request.nextUrl.searchParams.get('id')?.split(',');
  if (!ids || ids.length === 0) return NextResponse.json(attractions);
  const filteredAttractions = attractions.filter((attraction) => ids.some((id) => attraction.id === Number(id))) as Attraction[];
  return NextResponse.json(filteredAttractions);
}
