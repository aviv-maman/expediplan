import { type NextRequest, NextResponse } from 'next/server';

/* Realtime Weather API
Current weather or realtime weather API method allows a user to get up to date current weather information in json and xml.
The data is returned as a Current Object.

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
*/

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.split(',');
  if (!q || q.length !== 2) return NextResponse.json({ message: 'values of latitude and longitude must be in length of 2!' });
  const url = `https://${process.env.RAPIDAPI_HOST}/current.json?q=${q[0]},${q[1]}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY as string,
      'X-RapidAPI-Host': process.env.RAPIDAPI_HOST as string,
    },
  };
  try {
    const response = await fetch(url, { ...options, next: { revalidate: 3600 } });
    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}
