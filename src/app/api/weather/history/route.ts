import { type NextRequest, NextResponse } from 'next/server';

/* History Weather API
History weather API method returns historical weather for last 7 days as json.
Subscription: Last 30 days or full history for a date on or after 1st Jan, 2010.

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

dt: Date<YYYY-MM-DD> - REQUIRED
For history API 'dt' should be on or after 1st Jan, 2010 in yyyy-MM-dd format.

lang: string - OPTIONAL
Returns 'condition:text' field in API in the desired language.

hour: number - OPTIONAL
Restricting history output to a specific hour in a given day.

end_dt: Date<YYYY-MM-DD> - OPTIONAL
Restrict date output for History API method. Should be on or after 1st Jan, 2010. Make sure end_dt is equal to or greater than 'dt'.
*/

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.split(',');
  if (!q || q.length !== 2) return NextResponse.json({ message: 'values of latitude and longitude must be in length of 2!' });
  const dateValue = request.nextUrl.searchParams.get('dt');
  if (!dateValue) return NextResponse.json({ message: 'date value must be provided!' });
  const hourValue = request.nextUrl.searchParams.get('hour');
  const endDateValue = request.nextUrl.searchParams.get('end_dt');
  const url = `https://${process.env.RAPIDAPI_HOST}/history.json?q=${q[0]},${q[1]}&dt=${dateValue}&hour=${hourValue}&end_dt=${endDateValue}`;
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
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
  }
}
