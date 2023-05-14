'use client';
import { createStyles, Text, Title, SimpleGrid, Paper, Stack, Box, Image, useMantineTheme } from '@mantine/core';
import type { Country } from '../../../types/general';
import { useMediaQuery } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 400,
    boxSizing: 'border-box',
    backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${theme.colors[theme.primaryColor][7]} 100%)`,
    borderRadius: theme.radius.md,
    padding: `calc(${theme.spacing.xl} * 0.5)`,

    [theme.fn.smallerThan('sm')]: {
      padding: `calc(${theme.spacing.xl} * 0.5)`,
    },
  },

  description: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.gray[7],

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.colors.cyan[1] : theme.colors.cyan[7],
    fontSize: '2rem',
    paddingBottom: theme.spacing.xs,
    [theme.fn.smallerThan('xs')]: {
      fontSize: '1.5rem',
    },
  },

  info: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
    padding: theme.spacing.sm,
  },
}));

interface InfoCountryProps {
  countryFromServer?: Country;
}

const InfoCountry: React.FC<InfoCountryProps> = ({ countryFromServer }) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  const prepareLanguages = (languages?: string[]) => {
    if (!languages) return 'Unknown';
    return languages?.map((item) => item).join(', ');
  };

  const PAPER_ITEMS = [
    { title: 'Name', value: countryFromServer?.name },
    { title: 'Native Name', value: countryFromServer?.native },
    { title: 'Capital', value: countryFromServer?.capital },
    { title: 'Population', value: countryFromServer?.population },
    { title: 'Languages', value: prepareLanguages(countryFromServer?.languages) },
    { title: 'Currency', value: `${countryFromServer?.currency_name} (${countryFromServer?.currency_symbol})` },
    { title: 'Phone Code', value: countryFromServer?.phone_code },
    { title: 'Region', value: countryFromServer?.region },
    { title: 'Sub Region', value: countryFromServer?.subregion },
    { title: 'Internet TLD', value: countryFromServer?.tld },
  ];

  return (
    <Stack>
      <SimpleGrid cols={2} spacing={'xs'} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Box>
          <Title className={classes.title}>Information</Title>
          <Paper className={classes.info} withBorder>
            {PAPER_ITEMS.map((item, index) => (
              <Text key={index} className={classes.description}>
                {item.title}: {item.value}
              </Text>
            ))}
          </Paper>
        </Box>
        <Box>
          <Title className={classes.title}>Map</Title>
          <Image
            src={countryFromServer?.map}
            alt={countryFromServer?.name}
            radius='md'
            withPlaceholder
            sx={{ border: '1px solid #dee2e6', borderRadius: '6px' }}
          />
        </Box>
      </SimpleGrid>
      <Box>
        <Title className={classes.title}>About</Title>
        <Paper withBorder sx={(theme) => ({ padding: theme.spacing.sm })}>
          <Text className={classes.description}>{countryFromServer?.about}</Text>
        </Paper>
      </Box>
    </Stack>
  );
};

export default InfoCountry;
