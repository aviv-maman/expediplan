import { NextRequest, NextResponse } from 'next/server';
import cities from '@/cities.json';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  const city = cities.find((city) => city.id === Number(id));
  return NextResponse.json(city);
}
