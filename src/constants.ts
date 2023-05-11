const env = process.env.NODE_ENV;
export const HOSTNAME =
  env === 'development' ? 'http://localhost:3000' : env === 'test' ? process.env.NEXT_PUBLIC_HOSTNAME_PREVIEW : process.env.NEXT_PUBLIC_HOSTNAME;

export enum CategoryName {
  FoodAndDrinks = 'Food & Drinks',
  Shopping = 'Shopping',
  BeautyAndHealth = 'Beauty & Health',
  SportsAndOutdoors = 'Sports & Outdoors',
  TravelAndTransportation = 'Travel & Transportation',
  Entertainment = 'Entertainment',
  Education = 'Education',
  Finance = 'Finance',
  Government = 'Government',
  Services = 'Services',
  HistoricSites = 'Historic Sites',
  Nature = 'Nature',
  Accommodation = 'Accommodation',
}
export const CATEGORIES_IN_CITY_PAGE = [CategoryName.HistoricSites, CategoryName.FoodAndDrinks, CategoryName.Shopping];
