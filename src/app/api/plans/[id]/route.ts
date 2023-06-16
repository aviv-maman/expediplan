import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
