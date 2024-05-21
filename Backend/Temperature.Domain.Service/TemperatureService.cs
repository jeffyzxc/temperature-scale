using Temperature.Domain.Service.Interface;

namespace Temperature.Domain.Service
{
    public class TemperatureService: ITemperatureService
    {
        private const int MinCelsius = -30;
        private const int MaxCelsius = 200;

        public int Convert(int value, TemperatureTypeEnum temperatureType)
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


        private int ConvertFahrenheitToCelsius(int fahrenheit)
        {
            return (int)((fahrenheit - 32) * (5.0 / 9.0));
        }

        private int ConvertCelsiusToFahrenheit(int celsius)
        {
            return (int)((celsius * (9.0 / 5.0)) + 32);
        }

        private void ValidateTemperatureRange(int temperature, int min, int max)
        {
            if (temperature < min || temperature > max)
            {
                throw new ArgumentOutOfRangeException(nameof(temperature), $"Value must be between {min} and {max} degrees Celsius.");
            }
        }
    }
}
