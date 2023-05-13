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

import type { Attraction } from '../../types/general';
import { CategoryName } from '@/constants';

export const filterAttractionsByCategory = (attractions: Attraction[], category: CategoryName) => {
  const filteredArray = attractions.filter((attraction) => attraction.category === category);
  return filteredArray;
};
