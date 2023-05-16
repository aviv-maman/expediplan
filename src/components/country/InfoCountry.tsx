'use client';
import { Box, Button, createStyles, Group, Highlight, Image, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import type { Country } from '../../../types/general';
import { useState } from 'react';
import { IconMap } from '@tabler/icons-react';

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
    color: theme.colorScheme === 'dark' ? theme.colors.cyan[5] : theme.colors.cyan[7],
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

  placeholder: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '6px',
    border: theme.colorScheme === 'dark' ? `1px solid ${theme.colors.dark[6]}` : `1px solid ${theme.colors.gray[2]}`,
  },
}));

interface InfoCountryProps {
  countryFromServer?: Country;
}

const InfoCountry: React.FC<InfoCountryProps> = ({ countryFromServer }) => {
  const { classes } = useStyles();
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prevState) => !prevState);
  };

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
      <SimpleGrid cols={2} spacing={'md'} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
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
          <Paper className={classes.info} withBorder id='paper-map'>
            <Image
              id='map'
              src={countryFromServer?.map || ''}
              alt={countryFromServer?.name || ''}
              className={classes.placeholder}
              withPlaceholder
              placeholder={<IconMap />}
            />
          </Paper>
        </Box>
      </SimpleGrid>
      <Box>
        <Group position='apart' spacing='xs'>
          <Title className={classes.title}>About</Title>
          <Button size='xs' color='lime' onClick={toggleShowMore} disabled={!countryFromServer?.about}>
            {showMore ? 'Show Less' : 'Show More'}
          </Button>
        </Group>
        <Paper withBorder sx={(theme) => ({ padding: theme.spacing.sm })}>
          <Highlight
            highlight={countryFromServer?.name || ''}
            className={classes.description}
            lineClamp={showMore ? 0 : 10}
            highlightStyles={(theme) => ({
              backgroundImage: theme.fn.linearGradient(45, theme.colors.cyan[5], theme.colors.indigo[5]),
              fontWeight: 700,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            })}>
            {countryFromServer?.about || 'Data is unavailable'}
          </Highlight>
        </Paper>
      </Box>
    </Stack>
  );
};

export default InfoCountry;
