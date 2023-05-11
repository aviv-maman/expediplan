'use client';
import { Skeleton } from '@mantine/core';

interface HeroSkeletonProps {
  height?: number;
}

const HeroSkeleton: React.FC<HeroSkeletonProps> = ({ height = 265 }) => {
  return <Skeleton height={height} />;
};

export default HeroSkeleton;
