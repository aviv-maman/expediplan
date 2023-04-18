'use client';

import { Avatar, Button, Card, Space, Typography } from '@douyinfe/semi-ui';

interface HelloBlockProps {}

const HelloBlock: React.FC<HelloBlockProps> = ({}) => {
  const { Meta } = Card;
  const { Text } = Typography;

  return (
    <Card
      style={{ maxWidth: 360 }}
      title={
        <Meta
          title='Semi Doc'
          description='Easily manage your project icons and easily upload, update and share a series of project icons.'
          avatar={
            <Avatar
              alt='Card meta img'
              size='default'
              src='https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/card-meta-avatar-docs-demo.jpg'
            />
          }
        />
      }
      headerExtraContent={<Text link>More</Text>}
      cover={
        <img
          alt='example'
          src='https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo.jpeg'
        />
      }
      footerLine={true}
      footerStyle={{ display: 'flex', justifyContent: 'flex-end' }}
      footer={
        <Space>
          <Button theme='borderless' type='primary'>
            Featured Case
          </Button>
          <Button theme='solid' type='primary'>
            Start
          </Button>
        </Space>
      }>
      Semi Design is a design system developed and maintained by IES-FE & IES-UED.
    </Card>
  );
};

export default HelloBlock;
