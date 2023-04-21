import { NextResponse } from 'next/server';
import dataCities from '@/data.json';

export async function GET(request: Request) {
  const { search } = new URL(request.url);
  const searchParams = new URLSearchParams(search);
  const searchValue = searchParams.get('id');
  const ids = searchValue?.split(',') || [];
  const filteredCities = dataCities.filter((city, index) => city.id === Number(ids[index]));
  return NextResponse.json(ids);
}
