'use client';
import { Container } from '@mantine/core';

interface CustomContainerProps extends React.ComponentPropsWithoutRef<typeof Container> {
  children: React.ReactNode;
}

const CustomContainer: React.FC<CustomContainerProps> = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>;
};

export default CustomContainer;
