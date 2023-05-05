import type { Category } from '../../types/general';

export const categoriesFetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<Category[]>);
export const categoryFetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<Category>);

export const getCategoriesAPI = (ids?: number | number[]) => {
  const env = process.env.NODE_ENV;
  const hostname = env === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_HOSTNAME;
  const params = new URLSearchParams(ids ? { id: String(ids) } : undefined);
  const API = `${hostname}/api/attractions/categories?${params}`;
  return API;
};

export const getCategoryByIdAPI = (id: number) => {
  const env = process.env.NODE_ENV;
  const hostname = env === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_HOSTNAME;
  const API = `${hostname}/api/attractions/categories/${id}`;
  return API;
};

export const getCategoryById = async (id: number): Promise<Category> => {
  const API = getCategoryByIdAPI(id);
  const res = await fetch(API, {
    // headers: { Authorization: `token ${TOKEN}` },
    // next: { revalidate: 3600 },
    // cache: 'no-cache',
  });
  if (!res.ok) {
    // This will activate the closest `error.tsx` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  if (data.message) {
    throw new Error(data.message);
  }
  return data as Category;
};
