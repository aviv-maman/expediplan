import { type NextRequest, NextResponse } from 'next/server';
import type { SiteSettings } from '../../../../types/general';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const body = (await request.json()) as SiteSettings;
  const temperatureUnit = body.temp_unit;
  const url = ``;
  const cookieStore = cookies();

  // @ts-expect-error: remove this line when type is fixed
  cookieStore.set('temperature-unit', temperatureUnit, { secure: true, httpOnly: true });
  try {
    // const response = await fetch(url);
    // const result = await response.json();
    const result = { temp_unit: temperatureUnit };
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}
