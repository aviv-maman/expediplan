'use client';
import { Container, Loader, type MantineColor, Title } from '@mantine/core';

interface PageLoaderProps {
  color?: MantineColor;
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'bars' | 'oval' | 'dots';
  text?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({ color = 'lime', size, variant = 'bars', text }) => {
  return (
    <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
      <Loader size={size} variant={variant} color={color} />
      &nbsp;
      <Title order={4} color={color}>
        {text}
      </Title>
    </Container>
  );
};

export default PageLoader;
