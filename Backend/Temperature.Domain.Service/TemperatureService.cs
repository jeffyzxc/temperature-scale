using Temperature.Domain.Service.Interface;

namespace Temperature.Domain.Service
{
    public class TemperatureService: ITemperatureService
    {
        private const int MinCelsius = -30;
        private const int MaxCelsius = 200;

        public double Convert(double value, TemperatureTypeEnum temperatureType)
        {
            if (temperatureType == TemperatureTypeEnum.CelciusToFarenheight)
            {
                ValidateTemperatureRange(value, MinCelsius, MaxCelsius);
                return ConvertCelsiusToFahrenheit(value);
            }
            else
            {
                var result = ConvertFahrenheitToCelsius(value);
                ValidateTemperatureRange(result, MinCelsius, MaxCelsius);

                return result;
            }
        }


        private double ConvertFahrenheitToCelsius(double fahrenheit)
        {
            return Math.Round((double)(fahrenheit - 32) * (5.0 / 9.0), 2, MidpointRounding.AwayFromZero);
        }

        private double ConvertCelsiusToFahrenheit(double celsius)
        {
            return Math.Round((double)(celsius * (9.0 / 5.0)) + 32, 2, MidpointRounding.AwayFromZero);
        }

        private void ValidateTemperatureRange(double temperature, int min, int max)
        {
            if (temperature < min || temperature > max)
            {
                throw new ArgumentOutOfRangeException(nameof(temperature), $"Value must be between {min} and {max} degrees Celsius.");
            }
        }
    }
}
