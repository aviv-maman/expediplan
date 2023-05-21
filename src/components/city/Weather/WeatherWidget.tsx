import type { City, WebsiteSettings } from '../../../../types/general';

interface WeatherWidgetProps {
  city?: City;
  temperatureUnit?: WebsiteSettings['temp_unit'];
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ city, temperatureUnit = 'c' }) => {
  const latitude = city?.latitude;
  const longitude = city?.longitude;
  const unit = temperatureUnit === 'c' ? 1 : 2;

  return (
    <div>
      <div id='weatherapi-weather-widget-3' />
      <script
        type='text/javascript'
        src={`https://www.weatherapi.com/weather/widget.ashx?q=${latitude},${longitude}&wid=3&tu=${unit}&div=weatherapi-weather-widget-3`}
        async
      />
    </div>
  );
};

export default WeatherWidget;
