import { NextResponse } from 'next/server';
import cities from '@/compactCities.json';

export async function GET(request: Request) {
  const { search } = new URL(request.url);
  const searchParams = new URLSearchParams(search);
  const searchValue = searchParams.get('id');
  const ids = searchValue?.split(',');
  if (!ids || ids.length === 0) {
    return NextResponse.json(cities);
  }
  const filteredCities = cities.filter((city) => ids.some((id) => city.id === Number(id)));
  return NextResponse.json(filteredCities);
}