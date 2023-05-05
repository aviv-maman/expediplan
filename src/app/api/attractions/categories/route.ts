import { NextRequest, NextResponse } from 'next/server';
import categories from '@/categories.json';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { search } = new URL(request.url);
  const searchParams = new URLSearchParams(search);
  const searchValue = searchParams.get('id');
  const ids = searchValue?.split(',');
  if (!ids || ids.length === 0) {
    return NextResponse.json(categories);
  }
  const filteredCategories = categories.filter((category) => ids.some((id) => category.id === Number(id)));
  return NextResponse.json(filteredCategories);
}
