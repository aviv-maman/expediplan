import { NextRequest, NextResponse } from 'next/server';
import attractions from '@/attractions.json';
import type { Attraction } from '../../../../../../types/general';
import { CategoryName } from '@/constants';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const cityId = Number(params.id);
  const { search } = new URL(request.url);
  const searchParams = new URLSearchParams(search);
  const searchValue = searchParams.get('category');
  const categories = searchValue?.split(',') as CategoryName[] | undefined;

  if (!categories || categories.length === 0) {
    const filteredAttractions = attractions.filter((attraction) => attraction.city === cityId) as Attraction[];
    return NextResponse.json(filteredAttractions);
  }
  const filteredAttractions = attractions.filter((attraction) =>
    categories?.some((category) => decodeURIComponent(attraction.category) === category && attraction.city === cityId)
  ) as Attraction[];
  return NextResponse.json(filteredAttractions);
}
