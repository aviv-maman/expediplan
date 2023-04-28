import type { Plan } from '../../types/general';

export async function getPlanByIdFromServer(id: string): Promise<Plan> {
  const env = process.env.NODE_ENV;
  const hostname = env === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_HOSTNAME;
  // const TOKEN = 'token';
  const API = `${hostname}/api/plans/${id}`;
  const res = await fetch(API, {
    // headers: { Authorization: `token ${TOKEN}` },
    cache: 'no-cache',
  });
  if (!res.ok) {
    // This will activate the closest `error.tsx` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  if (data.message) {
    throw new Error(data.message);
  }
  return data as Plan;
}
