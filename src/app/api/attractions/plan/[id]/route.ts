import { NextRequest, NextResponse } from 'next/server';
import attractions from '@/compactAttractions.json';
import type { Attraction } from '../../../../../../types/general';

// export async function GET(request: NextRequest) {
//   const { search } = new URL(request.url);
//   const searchParams = new URLSearchParams(search);
//   const searchValue = searchParams.get('id');
//   const ids = searchValue?.split(',');
//   if (!ids || ids.length === 0) {
//     return NextResponse.json(attractions);
//   }
//   const filteredAttractions = attractions.filter((attraction) => ids.some((id) => attraction.id === Number(id))) as Attraction[];
//   return NextResponse.json(filteredAttractions);
// }

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const planId = params.id;
  const filteredAttractions = attractions.filter((attraction) => attraction.country_id === planId);
  return NextResponse.json([...filteredAttractions]);
}
