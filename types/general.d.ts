import { CategoryName } from '@/constants';

export type Country = {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  subregion: string;
  timezones: {
    zoneName: string;
    gmtOffset: number;
    gmtOffsetName: string;
    abbreviation: string;
    tzName: string;
  }[];
  latitude: string;
  longitude: string;
  emoji: string;
  emojiU: string;
  flag: string;
  languages: string[];
  population: number;
  about: string;
  cover_image: string;
  images: string[];
  map: string;
};

export type City = {
  id: number;
  name: string;
  state_id: string;
  state_code: number;
  state_name: string;
  country_id: number;
  country_code: string;
  country_name: string;
  latitude: number;
  longitude: number;
  wikiDataId: string;
  about: string;
  cover_image: string;
  images: string[];
};

export type Plan = {
  id: string;
  name: string;
  country: number;
  city: number;
  startDate: Date;
  endDate: Date;
  countryName: string;
  cityName: string;
  days: { index: number; date: Date; interests?: Interest[] }[];
  duration: number;
};

export type Attraction = {
  id: number;
  name: string;
  country: number;
  city: number;
  address: {
    street: string;
    city: string;
    country: string;
  };
  latitude: number;
  longitude: number;
  category: CategoryName;
  type: string;
  rating: number;
  cover_image: string;
  images: string[];
  tags: string[];
  contact: { website: string; phone: string; email: string };
  opening_hours: {
    day: number;
    open_time: string;
    close_time: string;
  }[];
  about: string;
};

export type Interest = {
  attraction_id: number;
  startTime: string;
  endTime: string;
};

export type Category = {
  id: number;
  name: CategoryName;
  types: string[];
};

export type WeatherResponse = {
  location: {
    name: string;
    region: string; //Region or state of the location, if available
    country: string;
    lat: number; //Latitude in decimal degree
    lon: number; //Longitude in decimal degree
    tz_id: string; //Time zone name
    localtime_epoch: number; //Local date and time in unix time
    localtime: string; //Local date and time
  };
  current: {
    last_updated_epoch: number; //Local time when the real time data was updated in unix time.
    last_updated: string; //Local time when the real time data was updated.
    temp_c: number; //Temperature in celsius
    temp_f: number; //Temperature in fahrenheit
    is_day: number; //1 = Yes 0 = No | Whether to show day condition icon or night icon
    condition: {
      text: string; //Weather condition text
      icon: string; //Weather condition icon url
      code: number;
    };
    wind_mph: number; //Wind speed in miles per hour
    wind_kph: number; //Wind speed in kilometer per hour
    wind_degree: number; //Wind direction in degrees
    wind_dir: string; //Wind direction as 16 point compass. e.g.: NSW
    pressure_mb: number; //Pressure in millibars
    pressure_in: number; //Pressure in inches
    precip_mm: number; //Precipitation amount in millimeters
    precip_in: number; //Precipitation amount in inches
    humidity: number; //Humidity as percentage
    cloud: number; //Cloud cover as percentage
    feelslike_c: number; //Feels like temperature in celsius
    feelslike_f: number; //Feels like temperature in fahrenheit
    vis_km: number; //Visibility in kilometers
    vis_miles: number; //Visibility in miles
    uv: number; //UV Index
    gust_mph: number; //Wind gust in miles per hour
    gust_kph: number; //Wind gust in kilometer per hour
  };
};

export type WebsiteSettings = {
  temp_unit?: 'c' | 'f';
  theme?: 'light' | 'dark';
};
