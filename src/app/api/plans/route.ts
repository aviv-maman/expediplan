import { NextRequest, NextResponse } from 'next/server';
import type { Plan } from '../../../../types/general';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Plan & { userEmail: string };
  const result = await prisma.user.update({
    where: { email: body.userEmail },
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
  });

  return NextResponse.json(result);
}
