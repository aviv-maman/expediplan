'use client';

import { createStyles, Header, Container, Group, Burger, Paper, Transition } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { HeaderColorSchemeToggle } from './HeaderColorSchemeToggle';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
  logo: {
    fill: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.dark[7],
  },
}));

interface HeaderResponsiveProps {
  links: { link: string; label: string; targetSegment: string | null }[];
}

export function HeaderResponsive({ links }: HeaderResponsiveProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { classes, cx } = useStyles();
  const activeSegment = useSelectedLayoutSegment();

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={{ pathname: link.link }}
      className={cx(classes.link, { [classes.linkActive]: activeSegment === link.targetSegment })}
      onClick={(event) => {
        close();
      }}>
      {link.label}
    </Link>
  ));

  return (
    <Header height={HEADER_HEIGHT} p='xs' className={classes.root}>
      <Container className={classes.header}>
        <Link href='/' style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          {/* <WebDevLogo className={classes.logo} /> */}
        </Link>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Group position='center'>
          <HeaderColorSchemeToggle />
          <Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' />
          <Transition transition='pop-top-right' duration={200} mounted={opened}>
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                {items}
              </Paper>
            )}
          </Transition>
          {/* <Button variant='default'>Log in</Button> */}
        </Group>
      </Container>
    </Header>
  );
}
