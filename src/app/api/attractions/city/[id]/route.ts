import { NextRequest, NextResponse } from 'next/server';
import attractions from '@/attractions.json';
import { Attraction } from '../../../../../../types/general';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const cityId = Number(params.id);
  const { search } = new URL(request.url);
  const searchParams = new URLSearchParams(search);
  const searchValue = searchParams.get('category');
  const categories = searchValue?.endsWith(',') ? searchValue.slice(0, -1).split(',') : searchValue?.split(',');

  if (!categories || categories.length === 0) {
    const filteredAttractions: Attraction[] = attractions.filter((attraction) => attraction.city === cityId);
    return NextResponse.json(filteredAttractions);
  }
  const filteredAttractions: Attraction[] = attractions.filter((attraction) =>
    categories?.some((category) => decodeURIComponent(attraction.category) === category && attraction.city === cityId)
  );
  return NextResponse.json(filteredAttractions);
}
