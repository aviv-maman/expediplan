import { NextRequest, NextResponse } from 'next/server';
import cities from '@/cities.json';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const city = cities.find((city) => city.id === Number(params.id));
  return NextResponse.json(city);
}
