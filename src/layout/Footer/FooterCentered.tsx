'use client';

import { createStyles, Group, ActionIcon, Footer } from '@mantine/core';
import { IconHelpSquareRounded, IconHome2, IconList, IconSettings } from '@tabler/icons-react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

const useStyles = createStyles((theme) => ({
  links: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
  logo: {
    fill: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.dark[7],
  },
  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
  actionIcon: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 12,
  },
}));

interface FooterCenteredProps {
  links?: { link: string; label: string; targetSegment: string | null }[];
  text?: string;
}

export function FooterCentered({ links, text }: FooterCenteredProps) {
  const { classes, cx } = useStyles();
  const activeSegment = useSelectedLayoutSegment();
  const items = links?.map((link) => (
    <Link key={link.label} href={{ pathname: link.link }} className={cx({ [classes.linkActive]: activeSegment === link.targetSegment })}>
      {link.label}
    </Link>
  ));

  return (
    <Footer height={60} p='xs'>
      <Link href='/'>{/* <WebDevLogo className={classes.logo} size={50} /> */}</Link>
      <Group spacing='xs' position='left' sx={{ justifyContent: 'space-between' }}>
        <Link href='/' className={cx({ [classes.linkActive]: activeSegment === null })}>
          <ActionIcon size='xl' variant='subtle' title='Home' className={classes.actionIcon}>
            <IconHome2 />
            Home
          </ActionIcon>
        </Link>
        <Link href='/plans' className={cx({ [classes.linkActive]: activeSegment === 'plans' })}>
          <ActionIcon size='xl' variant='subtle' title='Plans' className={classes.actionIcon}>
            <IconList />
            Plans
          </ActionIcon>
        </Link>
        <Link href='/settings' className={cx({ [classes.linkActive]: activeSegment === 'settings' })}>
          <ActionIcon size='xl' variant='subtle' title='Settings' className={classes.actionIcon}>
            <IconSettings />
            Settings
          </ActionIcon>
        </Link>
        <Link href='/help' className={cx({ [classes.linkActive]: activeSegment === 'help' })}>
          <ActionIcon size='xl' variant='subtle' title='Help' className={classes.actionIcon}>
            <IconHelpSquareRounded />
            Help
          </ActionIcon>
        </Link>
      </Group>
    </Footer>
  );
}
