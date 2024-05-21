using Temperature.Domain.Service.Interface;

namespace Temperature.API.Model
{
    public class GetTemperatureModel
    {
        public TemperatureTypeEnum type { get; set; }
        public int Value { get; set; }
    }
}
