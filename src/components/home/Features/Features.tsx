'use client';

import { Image, Text, Container, ThemeIcon, Title, SimpleGrid, createStyles, rem } from '@mantine/core';
import IMAGES from './images';
import featuresProps from './featuresProps';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: rem(1),
    paddingBottom: rem(50),
  },

  item: {
    display: 'flex',
  },

  itemIcon: {
    padding: theme.spacing.xs,
    marginRight: theme.spacing.md,
    background:
      theme.colorScheme === 'dark'
        ? theme.fn.gradient({ from: theme.colors.green[7], to: theme.colors.cyan[5], deg: 30 })
        : theme.fn.gradient({ from: theme.colors.green[3], to: theme.colors.cyan[7], deg: 30 }),
  },

  itemTitle: {
    marginBottom: `calc(${theme.spacing.xs} / 2)`,
  },

  supTitle: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 800,
    fontSize: theme.fontSizes.sm,
    color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    letterSpacing: rem(0.5),
  },

  title: {
    lineHeight: 1,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },

  description: {
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },

  highlight: {
    backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
    padding: rem(5),
    paddingTop: 0,
    borderRadius: theme.radius.sm,
    display: 'inline-block',
    color: theme.colorScheme === 'dark' ? theme.white : 'inherit',
  },
}));

interface FeatureImage {
  image: string;
  title: React.ReactNode;
  description: React.ReactNode;
}

interface FeaturesProps {
  supTitle: React.ReactNode;
  description: React.ReactNode;
  data: FeatureImage[];
}

const Features: React.FC = () => {
  const { classes } = useStyles();
  const { supTitle, description, data } = featuresProps as FeaturesProps;

  const items = data.map((item) => (
    <div className={classes.item} key={item.image}>
      <ThemeIcon variant='light' className={classes.itemIcon} size={60} radius='md'>
        <Image src={IMAGES[item.image]} />
      </ThemeIcon>

      <div>
        <Text fw={700} fz='lg' className={classes.itemTitle}>
          {item.title}
        </Text>
        <Text c='dimmed'>{item.description}</Text>
      </div>
    </div>
  ));

  return (
    <Container size={700} className={classes.wrapper}>
      <Text className={classes.supTitle}>{supTitle}</Text>

      <Title className={classes.title} order={2}>
        Experience the{' '}
        <Text
          component='span'
          className={classes.highlight}
          sx={(theme) => ({ backgroundImage: theme.fn.gradient({ from: 'lime.4', to: 'green.5', deg: 45 }) })}>
          best
        </Text>{' '}
        of travel planning
      </Title>

      <Container size={660} p={0}>
        <Text color='dimmed' className={classes.description}>
          {description}
        </Text>
      </Container>

      <SimpleGrid cols={2} spacing={50} breakpoints={[{ maxWidth: 550, cols: 1, spacing: 40 }]} style={{ marginTop: 30 }}>
        {items}
      </SimpleGrid>
    </Container>
  );
};

export default Features;
