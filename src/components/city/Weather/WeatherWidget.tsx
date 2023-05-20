import type { City } from '../../../../types/general';

interface WeatherWidgetProps {
  city?: City;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ city }) => {
  const latitude = city?.latitude;
  const longitude = city?.longitude;

  return (
    <div>
      <div id='weatherapi-weather-widget-3' />
      <script
        type='text/javascript'
        src={`https://www.weatherapi.com/weather/widget.ashx?q=${latitude},${longitude}&wid=3&tu=1&div=weatherapi-weather-widget-3`}
        async
      />
    </div>
  );
};

export default WeatherWidget;
