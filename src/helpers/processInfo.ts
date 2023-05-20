// const splitValues = [...categories]; // Values to split by
// const splitArrays = attractions.reduce((result, obj) => {
//   splitValues.forEach((value, index) => {
//     if (decodeURIComponent(obj.category) === value && obj.city === cityId) {
//       const key = `arr_${index}`;
//       if (!result[key]) {
//         result[key] = [];
//       }
//       result[key].push(obj);
//     }
//   });
//   return result;
// }, {});

import { RefObject } from 'react';
import type { Attraction, Category, City, Country } from '../../types/general';
import { CategoryName } from '@/constants';

export const filterAttractionsByCategory = (attractions: Attraction[], category: CategoryName) => {
  const filteredArray = attractions.filter((attraction) => attraction.category === category);
  return filteredArray;
};

export const sortArrayOfObjectsByName = (array: Attraction[] | City[] | Country[] | Category[]) => {
  const sortedArray = array.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return nameA > nameB ? 1 : -1;
  });
  return sortedArray;
};

export const getNumberOfLinesByRef = (elementRef: RefObject<HTMLDivElement>) => {
  if (elementRef.current) {
    const element = elementRef.current;
    const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
    const lines = Math.round(element.clientHeight / lineHeight);
    return lines;
  }
  return 0;
};

export const debounceAction = (fn: () => void, ms: number) => {
  let timer: NodeJS.Timeout | null;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, ms);
  };
};

export const dateToYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};

export const dateToYYYYMMDDAndTime = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
