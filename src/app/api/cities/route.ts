import { NextRequest, NextResponse } from 'next/server';
import cities from '@/cities.json';

export async function GET(request: NextRequest) {
  const ids = request.nextUrl.searchParams.get('id')?.split(',');
  if (!ids || ids.length === 0) return NextResponse.json(cities);
  const filteredCities = cities.filter((city) => ids.some((id) => city.id === Number(id)));
  return NextResponse.json(filteredCities);
}
