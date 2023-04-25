'use client';
import { useState } from 'react';
import { createStyles, Table, ScrollArea, UnstyledButton, Group, Text, Center, TextInput, rem } from '@mantine/core';
import { keys } from '@mantine/utils';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import { useRecoilValue } from 'recoil';
import { planListState } from '../create-new-form/NewPlanForm';
import { Plan } from '../../../types/general';
import useSWR from 'swr';
import { countriesFetcher, getCountriesAPI } from '@/api/CountriesAPI';
import { sortBy } from 'sort-by-typescript';

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
  return data.filter((item) => keys(data[0]).some((key) => item[key].toString().toLowerCase().includes(query)));
}

export function TableSort({ data }: { data: Plan[] }) {
  const planList = useRecoilValue(planListState);
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortByKey, setSortByKey] = useState<keyof Plan | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const countries = useSWR(getCountriesAPI(), countriesFetcher);

  const setSorting = (field: keyof Plan) => {
    setReverseSortDirection((current) => !current);
    setSortByKey(field);
    setSortedData((current) => current.sort(sortBy(!reverseSortDirection ? field : `-${field}`)));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  const rows = sortedData.map((row) => (
    <tr key={row.name}>
      <td style={{ lineClamp: 2, WebkitLineClamp: 2, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{row.name}</td>
      <td style={{ lineClamp: 2, WebkitLineClamp: 2, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{row.city}</td>
      <td style={{ lineClamp: 2, WebkitLineClamp: 2, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{row.startDate}</td>
    </tr>
  ));

  return (
    <ScrollArea>
      <TextInput placeholder='Search by any field' mb='md' icon={<IconSearch size='0.9rem' />} value={search} onChange={handleSearchChange} />
      <Table striped highlightOnHover withBorder withColumnBorders horizontalSpacing='xs' verticalSpacing='xs' sx={{ tableLayout: 'fixed' }}>
        <caption>Some elements from periodic table</caption>
        <thead>
          <tr>
            <Th sorted={sortByKey === 'name'} reversed={reverseSortDirection} onSort={() => setSorting('name')}>
              Name
            </Th>
            <Th sorted={sortByKey === 'city'} reversed={reverseSortDirection} onSort={() => setSorting('city')}>
              Destination
            </Th>
            <Th sorted={sortByKey === 'startDate'} reversed={reverseSortDirection} onSort={() => setSorting('startDate')}>
              Start Date
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(planList[0]).length}>
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
