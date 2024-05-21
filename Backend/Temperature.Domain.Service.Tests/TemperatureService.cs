
using Xunit;
using Temperature.Domain.Service.Interface;

namespace Temperature.Domain.Service.Tests
{
    public class TemperatureServiceTest
    {
        private ITemperatureService _service;

        public TemperatureServiceTest()
        {
            _service = new TemperatureService();
        }

        [Fact]
        public void Convert_CelsiusToFahrenheit_InRange_ReturnsCorrectValue()
        {
            // Arrange
            int celsiusValue = 100;
            int expectedFahrenheit = 212;

            // Act
            int actualFahrenheit = _service.Convert(celsiusValue, TemperatureTypeEnum.CelciusToFarenheight);

            // Assert
            Assert.Equal(expectedFahrenheit, actualFahrenheit);
        }

        [Fact]
        public void Convert_FahrenheitToCelsius_InRange_ReturnsCorrectValue()
        {
            // Arrange
            int fahrenheitValue = 212;
            int expectedCelsius = 100;

            // Act
            int actualCelsius = _service.Convert(fahrenheitValue, TemperatureTypeEnum.FahrenheitToCelcius);

            // Assert
            Assert.Equal(expectedCelsius, actualCelsius);
        }

        [Fact]
        public void Convert_BelowMinimumCelsius_ThrowsArgumentOutOfRangeException()
        {
            // Arrange
            int value = -31;
            TemperatureTypeEnum temperatureType = TemperatureTypeEnum.CelciusToFarenheight;

            // Act & Assert
            Assert.Throws<ArgumentOutOfRangeException>(() => _service.Convert(value, temperatureType));
        }

        [Fact]
        public void Convert_AboveMaximumCelsius_ThrowsArgumentOutOfRangeException()
        {
            int value = 201;
            TemperatureTypeEnum temperatureType = TemperatureTypeEnum.CelciusToFarenheight;

            Assert.Throws<ArgumentOutOfRangeException>(() => _service.Convert(value, temperatureType));
        }
    }
}