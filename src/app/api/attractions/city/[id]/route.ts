import { NextRequest, NextResponse } from 'next/server';
import attractions from '@/attractions.json';
import type { Attraction } from '../../../../../../types/general';
import { CategoryName } from '@/constants';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const cityId = Number(params.id);
  const limit = request.nextUrl.searchParams.get('limit');
  const categories = request.nextUrl.searchParams.get('category')?.split(',') as CategoryName[] | undefined;

  if (!categories || categories.length === 0) {
    const filteredAttractions = attractions.filter((attraction) => attraction.city === cityId) as Attraction[];
    if (limit) {
      return NextResponse.json(filteredAttractions.slice(0, Number(limit)));
    }
    return NextResponse.json(filteredAttractions);
  } else {
    const data = attractions.reduce((result, obj) => {
      categories.forEach((value) => {
        if (decodeURIComponent(obj.category) === value && obj.city === cityId) {
          if (limit && result.length === Number(limit)) {
            return;
          }
          result.push({ ...obj, category: value });
        }
      });
      return result;
    }, [] as Attraction[]);

    return NextResponse.json(data);
  }
}
