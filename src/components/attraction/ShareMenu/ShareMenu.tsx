'use client';
import { ActionIcon, CopyButton, Menu } from '@mantine/core';
import { IconClipboard, IconMail, IconShare2 } from '@tabler/icons-react';
import { type FC } from 'react';

interface ShareMenuProps {
  name?: string;
  type?: string;
}

const ShareMenu: FC<ShareMenuProps> = ({ name, type }) => {
  const currentURL = String(window.location);
  const subject = `Check out ${name} on ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`;
  const body = `Check out the ${type?.toLowerCase()} ${name} that I found on ${process.env.NEXT_PUBLIC_WEBSITE_NAME}!%0D%0A%0D%0A${currentURL}`; //%0D%0A is a line break

  return (
    <Menu shadow='md'>
      <Menu.Target>
        <ActionIcon variant='default'>
          <IconShare2 size='1.2rem' />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<IconMail size={14} />}>
          <a href={`mailto:?subject=${subject}&body=${body}`}>Share via email</a>
        </Menu.Item>
        <Menu.Item icon={<IconClipboard size={14} />}>
          <CopyButton value={currentURL}>{({ copy }) => <div onClick={copy}>Copy link</div>}</CopyButton>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ShareMenu;
