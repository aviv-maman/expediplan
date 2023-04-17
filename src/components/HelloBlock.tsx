'use client';

import { type FC } from 'react';
import { Card, CardSection } from '@kiwicom/orbit-components';

interface HelloBlockProps {}

const HelloBlock: FC<HelloBlockProps> = ({}) => {
  return (
    <Card>
      <CardSection>Hello World!</CardSection>
    </Card>
  );
};

export default HelloBlock;
