import { NextRequest, NextResponse } from 'next/server';
import countries from '@/countries.json';

export async function GET(request: NextRequest) {
  const ids = request.nextUrl.searchParams.get('id')?.split(',');
  if (!ids || ids.length === 0) return NextResponse.json(countries);
  const filteredCountries = countries.filter((country) => ids.some((id) => country.id === Number(id)));
  return NextResponse.json(filteredCountries);
}
