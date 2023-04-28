'use client';
import { Button } from '@mantine/core';
import { signIn, signOut, useSession } from 'next-auth/react';

interface ProtectedProps {}

const Protected: React.FC<ProtectedProps> = ({}) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <Button onClick={() => signIn()}>Sign in</Button>
    </>
  );
};

export default Protected;
