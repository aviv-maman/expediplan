'use client';

import { Stack } from '@mantine/core';

const CustomStack: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Stack>{children}</Stack>;
};

export default CustomStack;
