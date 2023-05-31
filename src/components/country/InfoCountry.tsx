'use client';
import { Box, Button, createStyles, Group, Highlight, Image, Paper, rem, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import type { Country } from '../../../types/general';
import { useEffect, useRef, useState } from 'react';
import { IconMap } from '@tabler/icons-react';
import { debounceAction, getNumberOfLinesByRef } from '@/lib/utils/processInfo';

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
    fontSize: rem(30),
    fontWeight: 900,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(18),
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
  country?: Country;
}

const InfoCountry: React.FC<InfoCountryProps> = ({ country }) => {
  const { classes } = useStyles();
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prevState) => !prevState);
    showMore ? setLineClamp(0) : setLineClamp(10);
  };

  const elementRef = useRef<HTMLDivElement>(null);
  const [disabled, setDisabled] = useState(true);
  const [lineClamp, setLineClamp] = useState(10);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    setDisabled(false);
    setShowMore(true);
    const lines = getNumberOfLinesByRef(elementRef);
    if (lines < 10) {
      setDisabled(true);
      setShowMore(false);
    }
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
    const debouncedHandleResize = debounceAction(handleResize, 1000);

    window.addEventListener('resize', debouncedHandleResize);

    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, [dimensions]);

  const prepareLanguages = (languages?: string[]) => {
    if (!languages) return 'Unknown';
    return languages?.map((item) => item).join(', ');
  };

  const PAPER_ITEMS = [
    { title: 'Name', value: country?.name },
    { title: 'Native Name', value: country?.native },
    { title: 'Capital', value: country?.capital },
    { title: 'Population', value: country?.population },
    { title: 'Languages', value: prepareLanguages(country?.languages) },
    { title: 'Currency', value: `${country?.currency_name} (${country?.currency_symbol})` },
    { title: 'Phone Code', value: country?.phone_code },
    { title: 'Region', value: country?.region },
    { title: 'Sub Region', value: country?.subregion },
    { title: 'Internet TLD', value: country?.tld },
  ];

  return (
    <Stack>
      <SimpleGrid cols={2} spacing={'md'} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Box>
          <Title className={classes.title} my='xs'>
            Information
          </Title>
          <Paper className={classes.info} withBorder>
            {PAPER_ITEMS.map((item, index) => (
              <Text key={index} className={classes.description} ff='inherit'>
                {item.title}: {item.value}
              </Text>
            ))}
          </Paper>
        </Box>
        <Box>
          <Title className={classes.title} my='xs'>
            Map
          </Title>
          <Paper className={classes.info} withBorder id='paper-map'>
            <Image
              id='map'
              src={country?.map || ''}
              alt={country?.name || ''}
              className={classes.placeholder}
              withPlaceholder
              placeholder={<IconMap />}
            />
          </Paper>
        </Box>
      </SimpleGrid>
      <Box>
        <Group position='apart' spacing='xs' my='xs'>
          <Title className={classes.title}>About</Title>
          <Button size='xs' color='lime' onClick={toggleShowMore} disabled={!country?.about || disabled} miw={93}>
            {showMore ? 'Show More' : disabled ? 'Show More' : 'Show Less'}
          </Button>
        </Group>
        <Paper withBorder sx={(theme) => ({ padding: theme.spacing.sm })}>
          <Highlight
            ref={elementRef}
            id={`about-${country?.id}`}
            highlight={country?.name || ''}
            className={classes.description}
            ff='inherit'
            lineClamp={lineClamp}
            highlightStyles={(theme) => ({
              backgroundImage: theme.fn.linearGradient(45, theme.colors.cyan[5], theme.colors.indigo[5]),
              fontWeight: 700,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            })}>
            {country?.about || 'Data is unavailable'}
          </Highlight>
        </Paper>
      </Box>
    </Stack>
  );
};

export default InfoCountry;
