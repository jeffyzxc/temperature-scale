using Temperature.Domain.Service.Interface;

namespace Temperature.API.Model
{
    public class GetTemperatureModel
    {
        public TemperatureTypeEnum type { get; set; }
        public double Value { get; set; }
    }
}
