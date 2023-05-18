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
