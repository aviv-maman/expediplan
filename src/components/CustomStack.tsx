'use client';
import { Stack } from '@mantine/core';

interface CustomStackProps extends React.ComponentPropsWithoutRef<typeof Stack> {
  children: React.ReactNode;
}

const CustomStack: React.FC<CustomStackProps> = ({ children, ...rest }) => {
  return <Stack {...rest}>{children}</Stack>;
};

export default CustomStack;
