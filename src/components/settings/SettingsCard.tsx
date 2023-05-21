'use client';
import { createStyles, Card, Group, Switch, Text, rem } from '@mantine/core';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import { useRecoilState } from 'recoil';
import { temperatureUnitAtom } from '@/recoil/city-weather_state';
import { updateWebsiteSettings } from '@/api/UpdateSettings';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  item: {
    '& + &': {
      paddingTop: theme.spacing.sm,
      marginTop: theme.spacing.sm,
      borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
    },
  },

  switch: {
    '& *': {
      cursor: 'pointer',
    },
  },

  title: {
    lineHeight: 1,
  },
}));

interface SettingsCardProps {}

export const SettingsCard: React.FC<SettingsCardProps> = () => {
  const { classes } = useStyles();
  const [temperatureUnit, setTemperatureUnit] = useRecoilState(temperatureUnitAtom);

  const handleTemperatureUnitChange = () => {
    setTemperatureUnit((currentValue) => (currentValue === 'c' ? 'f' : 'c'));
    updateWebsiteSettings({ temp_unit: temperatureUnit === 'c' ? 'f' : 'c' });
  };

  return (
    <Card withBorder radius='md' p='xl' className={classes.card}>
      <Text fz='lg' className={classes.title} fw={500}>
        Website Settings
      </Text>
      <Text fz='xs' c='dimmed' mt={3} mb='xl'>
        Change general settings
      </Text>
      <ColorSchemeToggle classes={classes} />

      {/* Switch template */}
      <Group position='apart' className={classes.item} noWrap spacing='xl'>
        <div>
          <Text>Temperature Unit</Text>
          <Text size='xs' color='dimmed'>
            Display temperature in Celsius or Fahrenheit
          </Text>
        </div>
        <Switch
          checked={temperatureUnit === 'c'}
          onChange={handleTemperatureUnitChange}
          onLabel='C'
          offLabel='F'
          className={classes.switch}
          size='lg'
        />
      </Group>
    </Card>
  );
};
