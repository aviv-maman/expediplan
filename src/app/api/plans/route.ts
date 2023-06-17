import { NextRequest, NextResponse } from 'next/server';
import type { Plan } from '../../../../types/general';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email || undefined },
  });
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const body = (await request.json()) as Plan;
  const result = await prisma.user.update({
    where: { email: session.user.email },
    data: {
      plans: {
        create: {
          name: body.name,
          country: body.country,
          city: body.city,
          startDate: body.startDate,
          endDate: body.endDate,
          countryName: body.countryName,
          cityName: body.cityName,
          days: {
            create: body.days.map((day) => ({
              index: day.index,
              date: day.date,
            })),
          },
          duration: body.duration,
        },
      },
    },
    select: {
      plans: {
        select: {
          id: true,
          name: true,
          country: true,
          city: true,
          startDate: true,
          endDate: true,
          countryName: true,
          cityName: true,
          days: {
            select: {
              // id: true,
              index: true,
              date: true,
            },
          },
          duration: true,
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  const addedPlan: Plan = result.plans[result.plans.length - 1];
  return NextResponse.json(addedPlan);
}

export async function GET(request: NextRequest) {
  // Get all plans from the authenticated user
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const plans = await prisma.plan.findMany({
    where: { author: { email: session.user.email } },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(plans);
}
