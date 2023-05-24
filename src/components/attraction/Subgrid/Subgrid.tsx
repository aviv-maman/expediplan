'use client';
import {
  SimpleGrid,
  Skeleton,
  Container,
  Stack,
  useMantineTheme,
  px,
  createStyles,
  Title,
  rem,
  Image,
  Text,
  Rating,
  Group,
  Badge,
  Paper,
  CopyButton,
  Button,
} from '@mantine/core';
import type { Attraction } from '../../../../types/general';
import { IconMail, IconMapPin, IconPhone, IconWorldWww } from '@tabler/icons-react';
import Link from 'next/link';
import ShareMenu from '../ShareMenu/ShareMenu';

export const BASE_HEIGHT = 540;

const useStyles = createStyles((theme) => ({
  skeleton: {
    border: theme.colorScheme === 'dark' ? '1px solid #787878' : '1px solid #dee2e6',
    borderRadius: '6px',
    width: '100%',
  },

  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(24),
    },
  },
  text: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontFamily: 'inherit',
  },
}));

interface SubgridProps {
  attraction: string;
}

export const Subgrid: React.FC<SubgridProps> = ({ attraction }) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const getSubHeight = (children: number, spacing: number) => BASE_HEIGHT / children - spacing * ((children - 1) / children);
  const heightWithTwoChildren = getSubHeight(2, px(theme.spacing.md));
  const heightWithThreeChildren = getSubHeight(3, px(theme.spacing.md));

  const deserializedAttraction = JSON.parse(attraction) as Attraction | undefined;
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const openingHours = deserializedAttraction?.opening_hours?.map((day) => {
    return (
      <Text key={day.day} className={classes.text}>
        {days[day.day]}: {day.open_time} - {day.close_time}
      </Text>
    );
  });

  const tags = deserializedAttraction?.tags?.map((tag) => {
    return (
      <Badge key={tag} color='green' radius='sm' variant='filled' my={5}>
        {tag}
      </Badge>
    );
  });

  return (
    <Container id='subgrid-container' w={'100%'} maw={'80rem'}>
      <Title
        order={2}
        className={classes.title}
        ta='center'
        mb='sm'
        variant='gradient'
        gradient={{ from: theme.colors.green[5], to: theme.colors.teal[5], deg: 45 }}>
        {`${deserializedAttraction?.name}, ${deserializedAttraction?.address?.city}`}
      </Title>
      <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} mb='md'>
        <Container p={'xs'} className={classes.skeleton}>
          <Group position='apart'>
            <Group spacing={5}>
              <Text className={classes.text}>
                <b>Rating:</b>
              </Text>
              <Rating value={deserializedAttraction?.rating} fractions={2} color='lime' readOnly name='google-rating' pb={3} />
            </Group>
            <ShareMenu name={deserializedAttraction?.name} type={deserializedAttraction?.type} />
          </Group>
          <Text className={classes.text}>
            <b>Category:</b> {deserializedAttraction?.category}
          </Text>
          <Text className={classes.text}>
            <b>Type:</b> {deserializedAttraction?.type}
          </Text>
          <Group spacing={10}>{tags}</Group>
        </Container>
        <Stack>
          <Image
            src={deserializedAttraction?.cover_image}
            alt={deserializedAttraction?.name}
            height={heightWithTwoChildren}
            radius='md'
            withPlaceholder
            className={classes.skeleton}
          />
          <Image
            src={deserializedAttraction?.images?.[0]}
            alt={deserializedAttraction?.name}
            height={heightWithTwoChildren}
            radius='md'
            withPlaceholder
            className={classes.skeleton}
          />
        </Stack>
        <Stack>
          <Image
            src={deserializedAttraction?.images?.[1]}
            alt={deserializedAttraction?.name}
            height={heightWithThreeChildren}
            radius='md'
            withPlaceholder
            className={classes.skeleton}
          />
          <Image
            src={deserializedAttraction?.images?.[2]}
            alt={deserializedAttraction?.name}
            height={heightWithThreeChildren}
            radius='md'
            withPlaceholder
            className={classes.skeleton}
          />
          <Image
            src={deserializedAttraction?.images?.[3]}
            alt={deserializedAttraction?.name}
            height={heightWithThreeChildren}
            radius='md'
            withPlaceholder
            className={classes.skeleton}
          />
        </Stack>
        <Container w={'100%'} p={'xs'} className={classes.skeleton}>
          <Text className={classes.text}>
            <b>Address:</b> {deserializedAttraction?.address?.street}, {deserializedAttraction?.address?.city},{' '}
            {deserializedAttraction?.address?.country}
          </Text>
          <Text className={classes.text}>
            <b>Opening Hours:</b> {openingHours}
          </Text>
          <Text className={classes.text}>
            <b>Phone:</b> {deserializedAttraction?.contact?.phone}
          </Text>
          <Button.Group my={5}>
            <Link href={{ pathname: `tel:${deserializedAttraction?.contact?.phone}` }} target='_blank' rel='noopener noreferrer'>
              <Button variant='default' leftIcon={<IconPhone size='1rem' />}>
                Call
              </Button>
            </Link>
            <CopyButton value={String(deserializedAttraction?.contact?.phone)}>
              {({ copied, copy }) => (
                <Button variant='default' color={copied ? 'teal' : ''} onClick={copy}>
                  {copied ? 'Copied!' : 'Copy number'}
                </Button>
              )}
            </CopyButton>
          </Button.Group>
          <Text className={classes.text}>
            <b>Email:</b> {deserializedAttraction?.contact?.email}
          </Text>
          <Button.Group my={5}>
            <Link href={{ pathname: `mailto:${deserializedAttraction?.contact?.email}` }} target='_blank' rel='noopener noreferrer'>
              <Button variant='default' leftIcon={<IconMail size='1rem' />}>
                Email
              </Button>
            </Link>
            <CopyButton value={String(deserializedAttraction?.contact?.email)}>
              {({ copied, copy }) => (
                <Button variant='default' color={copied ? 'teal' : ''} onClick={copy}>
                  {copied ? 'Copied!' : 'Copy email'}
                </Button>
              )}
            </CopyButton>
          </Button.Group>
          <Group spacing={10} my={5}>
            <Button.Group mt={5}>
              <Link href={{ pathname: `${deserializedAttraction?.contact?.website}` }} target='_blank' rel='noopener noreferrer'>
                <Button variant='default' leftIcon={<IconWorldWww size='1rem' />}>
                  Visit website
                </Button>
              </Link>
              <Link
                href={{ pathname: `geo:${deserializedAttraction?.latitude},${deserializedAttraction?.longitude}` }}
                target='_blank'
                rel='noopener noreferrer'>
                <Button variant='default' leftIcon={<IconMapPin size='1rem' />}>
                  Navigate
                </Button>
              </Link>
            </Button.Group>
          </Group>
        </Container>
      </SimpleGrid>
      <Paper p={'xs'} mb={'md'} className={classes.skeleton}>
        <Text className={classes.text} align='center' fw={600}>
          About
        </Text>
        <Text className={classes.text}>{deserializedAttraction?.about}</Text>
      </Paper>
      <Skeleton height={360} radius='md' animate={false} className={classes.skeleton} />
    </Container>
  );
};
