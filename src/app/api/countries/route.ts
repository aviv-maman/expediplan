import { NextResponse } from 'next/server';
import countries from '@/compactCountries.json';

export async function GET(request: Request) {
  const { search } = new URL(request.url);
  const searchParams = new URLSearchParams(search);
  const searchValue = searchParams.get('id');
  const ids = searchValue?.split(',');
  if (!ids || ids.length === 0) {
    return NextResponse.json(countries);
  }
  const filteredCountries = countries.filter((country) => ids.some((id) => country.id === Number(id)));
  return NextResponse.json(filteredCountries);
}
