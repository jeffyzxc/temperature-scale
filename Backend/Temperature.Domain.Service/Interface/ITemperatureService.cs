using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Temperature.Domain.Service.Interface
{
    public enum TemperatureTypeEnum
    {
        FahrenheitToCelcius,
        CelciusToFarenheight
    }

    public interface ITemperatureService
    {
        int Convert(int value, TemperatureTypeEnum temperatureType);
    }
}
