import { Avatar, Group, Select, Text } from '@mantine/core';
import { forwardRef } from 'react';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  icon: string;
  label: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(({ icon, label, ...others }: ItemProps, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap>
      <Avatar src={icon} size={16} />
      <Text size='sm'>{label}</Text>
    </Group>
  </div>
));
SelectItem.displayName = 'SelectItem';

interface DropdownWithIconProps extends React.ComponentPropsWithoutRef<typeof Select> {
  data: { value: string; label: string; icon: string }[];
}

const DropdownWithIcon: React.FC<DropdownWithIconProps> = ({ data, ...others }) => {
  return <Select itemComponent={SelectItem} data={data} {...others} />;
};

export default DropdownWithIcon;
