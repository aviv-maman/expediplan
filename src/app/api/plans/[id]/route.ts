import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import type { PatchablePlan } from '../../../../../types/general';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
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
  const body = (await request.json()) as PatchablePlan;
  const plan = await prisma.plan.update({
    where: {
      id: Number(params.id),
    },
    data: {
      name: body.name,
      startDate: body.startDate,
      endDate: body.endDate,
    },
  });
  return NextResponse.json(plan);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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
  const deletedPlan = await prisma.plan.delete({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(deletedPlan);
}
