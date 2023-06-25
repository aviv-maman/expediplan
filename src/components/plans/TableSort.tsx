'use client';
import { useState } from 'react';
import { createStyles, Table, ScrollArea, UnstyledButton, Group, Text, Center, TextInput, rem, Button } from '@mantine/core';
import { keys } from '@mantine/utils';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch, IconPlaneTilt } from '@tabler/icons-react';
import { useRecoilValue } from 'recoil';
import type { Plan } from '../../../types/general';
import { sortBy } from 'sort-by-typescript';
import { planListState } from '@/recoil/plan_state';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { getPlansAPI, getPlansFromLocalStorage, plansFetcher } from '@/api/PlansAPI';
import useSWR from 'swr';

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
}));

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();

  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position='apart'>
          <Text fw={500} fz='sm'>
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size='0.9rem' stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: Plan[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some(
      (key) => key !== 'id' && key !== 'country' && key !== 'city' && key !== 'days' && item[key].toString().toLowerCase().includes(query)
    )
  );
}

export function TableSort() {
  const session = useSession();
  const { data: plansFromServer } = useSWR(session.data?.user?.id ? getPlansAPI() : null, plansFetcher, { suspense: true });
  const plans = plansFromServer ? plansFromServer : getPlansFromLocalStorage();
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(plans);
  const [sortByKey, setSortByKey] = useState<keyof Plan | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof Plan) => {
    setReverseSortDirection((current) => !current);
    setSortByKey(field);
    setSortedData((current) => current?.sort(sortBy(!reverseSortDirection ? field : `-${field}`)));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
    const filteredData = filterData(plans || [], event.currentTarget.value);
    setSortedData(filteredData);
  };

  const rows = sortedData?.map((row) => (
    <tr key={row.id}>
      <td style={{ lineClamp: 2, WebkitLineClamp: 2, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <Link key={row.id} href={{ pathname: `/plans/${row.id}` }} style={{ display: 'block' }}>
          {row.name}
        </Link>
      </td>
      <td style={{ lineClamp: 2, WebkitLineClamp: 2, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <Link key={row.id} href={{ pathname: `/plans/${row.id}` }} tabIndex={-1} style={{ display: 'block' }}>
          {row.countryName}
        </Link>
      </td>
      <td style={{ lineClamp: 2, WebkitLineClamp: 2, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <Link key={row.id} href={{ pathname: `/plans/${row.id}` }} tabIndex={-1} style={{ display: 'block' }}>
          {dayjs(row.startDate).format('YYYY-MM-DD')}
        </Link>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <TextInput placeholder='Search by any field' mb='md' icon={<IconSearch size='0.9rem' />} value={search} onChange={handleSearchChange} />
      <Table striped highlightOnHover withBorder withColumnBorders horizontalSpacing='xs' verticalSpacing='xs' sx={{ tableLayout: 'fixed' }}>
        <caption>
          <Link href={{ pathname: '/create-new-plan' }}>
            <Button leftIcon={<IconPlaneTilt size='1rem' />} color='teal'>
              Create Plan
            </Button>
          </Link>
        </caption>
        <thead>
          <tr>
            <Th sorted={sortByKey === 'name'} reversed={reverseSortDirection} onSort={() => setSorting('name')}>
              Name
            </Th>
            <Th sorted={sortByKey === 'countryName'} reversed={reverseSortDirection} onSort={() => setSorting('countryName')}>
              Country
            </Th>
            <Th sorted={sortByKey === 'startDate'} reversed={reverseSortDirection} onSort={() => setSorting('startDate')}>
              Start Date
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows && rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={3}>
                <Text weight={500} align='center'>
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
