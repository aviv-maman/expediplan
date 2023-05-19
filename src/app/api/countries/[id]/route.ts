import { NextRequest, NextResponse } from 'next/server';
import countries from '@/countries.json';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const filteredCountries = countries.find((country) => country.id === Number(params.id));
  return NextResponse.json(filteredCountries);
}
