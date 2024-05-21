using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Temperature.API.Model;
using Temperature.Domain.Service.Interface;

namespace Temperature.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemperatureController : ControllerBase
    {
        private ITemperatureService _temperatureService;

        public TemperatureController(ITemperatureService temperatureService)
        {
            _temperatureService = temperatureService;
        }


        [HttpGet()]
        public int Get([FromQuery] GetTemperatureModel request)
        {
            return _temperatureService.Convert(request.Value, request.type);
        }
    }
}
