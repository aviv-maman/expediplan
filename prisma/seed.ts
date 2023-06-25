import { PrismaClient } from '@prisma/client';
import countries from '../src/countries.json';

const prisma = new PrismaClient();

async function main() {
  for (const country of countries) {
    await prisma.country.create({
      data: {
        id: country.id,
        name: country.name,
        iso3: country.iso3,
        iso2: country.iso2,
        numericCode: country.numeric_code,
        phoneCode: country.phone_code,
        capital: country.capital,
        currency: country.currency,
        currencyName: country.currency_name,
        currencySymbol: country.currency_symbol,
        tld: country.tld,
        native: country.native,
        region: country.region,
        subregion: country.subregion,
        timezones: { create: country.timezones },
        latitude: country.latitude,
        longitude: country.longitude,
        emoji: country.emoji,
        emojiU: country.emojiU,
        flag: country.flag,
        languages: country.languages,
        population: country.population,
        about: country.about,
        coverImage: country.cover_image,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
