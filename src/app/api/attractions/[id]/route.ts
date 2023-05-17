import { NextRequest, NextResponse } from 'next/server';
import attractions from '@/attractions.json';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  const attraction = attractions.find((attraction) => attraction.id === Number(id));
  return NextResponse.json(attraction);
}
