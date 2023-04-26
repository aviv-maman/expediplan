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
  translations: {
    kr: string;
    ptBR: string;
    pt: string;
    nl: string;
    hr: string;
    fa: string;
    de: string;
    es: string;
    fr: string;
    ja: string;
    it: string;
    cn: string;
    tr: string;
  };
  latitude: string;
  longitude: string;
  emoji: string;
  emojiU: string;
  flag: string;
  about: string;
  cover_image: string;
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
};

export type Plan = {
  id: string;
  name: string;
  country: number;
  city: number;
  startDate: string;
  endDate: string;
  countryName: string;
  days?: { index: number; date: string; attractions?: Attraction[] }[];
};

export type Attraction = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
  type: string;
  rating: number;
  cover_image: string;
  images: string[];
  tags: string[];
  contact: { website: string; phone: string; email: string };
  openingHoursPeriods: {
    close: { day: number; time: string };
    open: { day: number; time: string };
  }[];
};
