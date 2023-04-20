'use client';

import { createStyles, Anchor, Group, ActionIcon, Tooltip, Footer } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing.md} ${theme.spacing.md}`,
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
  logo: {
    fill: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.dark[7],
  },
}));

interface FooterCenteredProps {
  links?: { link: string; label: string }[];
  text?: string;
}

export function FooterCentered({ links, text }: FooterCenteredProps) {
  const { classes } = useStyles();
  const items = links?.map((link) => (
    <Anchor<'a'>
      color='dimmed'
      key={link.label}
      href={link.link}
      sx={{ lineHeight: 1, fontFamily: 'inherit' }}
      onClick={(event) => event.preventDefault()}
      size='sm'>
      {link.label}
    </Anchor>
  ));

  return (
    <Footer height={60} p='md' className={classes.inner}>
      <Link href='/' style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        {/* <WebDevLogo className={classes.logo} size={50} /> */}
      </Link>
      <Group spacing='xs' position='right' noWrap>
        <Tooltip label='GitHub'>
          <ActionIcon
            size='lg'
            variant='default'
            radius='xl'
            component='a'
            href='https://github.com/aviv-maman'
            target='_blank'
            rel='noopener noreferrer'>
            <IconBrandGithub size='1.05rem' stroke={1.5} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label='LinkedIn'>
          <ActionIcon
            size='lg'
            variant='default'
            radius='xl'
            component='a'
            href='https://www.linkedin.com/in/aviv-maman-914a95223'
            target='_blank'
            rel='noopener noreferrer'>
            <IconBrandLinkedin size='1.05rem' stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Footer>
  );
}
