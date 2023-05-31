'use client';
import { Avatar, Text, Button, Paper, Skeleton, Stack } from '@mantine/core';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { fakeDelay } from '@/lib/utils/network';
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react';

export const UserInfoCard = () => {
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = async () => {
      await fakeDelay();
      setLoading(false);
    };
    delay();
  }, []);

  if (session?.user) {
    return (
      <Paper
        radius='md'
        withBorder
        p='lg'
        mb='xl'
        sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white })}>
        <Avatar src={session.user?.image} size={120} radius={120} mx='auto' />
        <Text ta='center' fz='lg' weight={500} mt='md'>
          {session?.user?.name}
        </Text>
        <Text ta='center' c='dimmed' fz='sm'>
          {session?.user?.email}
        </Text>
        <Button variant='default' fullWidth mt='md' onClick={() => signOut()}>
          Sign out
        </Button>
      </Paper>
    );
  }

  return (
    <Paper
      radius='md'
      withBorder
      p='lg'
      mb='xl'
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      })}>
      {status === 'loading' || loading ? (
        <>
          <Skeleton height={120} circle mb='lg' radius={120} mx='auto' />
          <Skeleton height={20} width={'80%'} mt='md' mx='auto' />
          <Skeleton height={16} fz='sm' width={'70%'} mt='xs' mx='auto' />
          <Skeleton height={36} mt='md' />
        </>
      ) : (
        <>
          <Avatar src={null} size={120} radius={120} mx='auto' />
          <Text ta='center' fz='lg' weight={500} mt='md'>
            Guest
          </Text>
          <Text ta='center' c='dimmed' fz='sm'>
            Email
          </Text>
          <Stack align='center' mt='md'>
            <Button leftIcon={<IconBrandGoogle size='1rem' />} variant='default' radius='md' onClick={() => signIn('google')}>
              Continue with Google
            </Button>
            <Button leftIcon={<IconBrandGithub size='1rem' />} variant='default' radius='md' onClick={() => signIn('github')}>
              Continue with GitHub
            </Button>
          </Stack>
        </>
      )}
    </Paper>
  );
};
