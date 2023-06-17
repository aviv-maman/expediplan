import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const plan = await prisma.plan.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  const days = await prisma.day.findMany({
    where: {
      planId: Number(params.id),
    },
  });
  const planWithDays = {
    ...plan,
    days,
  };
  return NextResponse.json(planWithDays);
}
