import { NextResponse } from 'next/server';
import cities from '@/compactCities.json';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const countryId = params.id;
  const filteredCities = cities.filter((city) => city.country_id === Number(countryId));
  return NextResponse.json([...filteredCities]);
}