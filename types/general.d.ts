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
  name: string;
  country: number;
  city: number;
  startDate: string;
  endDate: string;
};
