import { type NextRequest, NextResponse } from 'next/server';

/* Forecast Weather API
q: string - REQUIRED
Query parameter based on which data is sent back.
'q' can be one of the following:
Latitude and Longitude (Decimal degree) e.g: q=48.8567,2.3508
city name e.g.: q=Paris
US zip e.g.: q=10001
UK postcode e.g: q=SW1
Canada postal code e.g: q=G2J
metar: e.g: q=metar:EGLL
iata:<3 digit airport code> e.g: q=iata:DXB
auto:ip IP lookup e.g: q=auto:ip
IP address (IPv4 and IPv6 supported) e.g: q=100.0.0.1

days: number - OPTIONAL
Number of days of forecast required.

lang: string - OPTIONAL
Returns 'condition:text' field in API in the desired language.

dt: Date<YYYY-MM-DD> - OPTIONAL
If passing 'dt', it should be between today and next 10 day in yyyy-MM-dd format.
*/

export async function GET(request: NextRequest) {
  const { search } = new URL(request.url);
  const searchParams = new URLSearchParams(search);
  const searchValue = searchParams.get('q');
  const q = searchValue?.split(',');
  if (!q || q.length !== 2) return NextResponse.json({ message: 'values of latitude and longitude must be in length of 2!' });
  const daysValue = searchParams.get('days');
  const dateValue = searchParams.get('dt');
  const url = `https://${process.env.RAPIDAPI_HOST}/forecast.json?q=${q[0]}%2C${q[1]}&days=${daysValue}&dt=${dateValue}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY as string,
      'X-RapidAPI-Host': process.env.RAPIDAPI_HOST as string,
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
  }
}