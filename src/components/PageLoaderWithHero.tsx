'use client';
import { Container, Loader, type MantineColor, Title } from '@mantine/core';

interface PageLoaderWithHeroProps {
  color?: MantineColor;
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'bars' | 'oval' | 'dots';
  text?: string;
}

const PageLoaderWithHero: React.FC<PageLoaderWithHeroProps> = ({ color = 'lime', size, variant = 'bars', text }) => {
  return (
    <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
      <Loader size={size} variant={variant} color={color} />
      &nbsp;
      <Title order={4} color={color}>
        {text}
      </Title>
    </Container>
  );
};

export default PageLoaderWithHero;
