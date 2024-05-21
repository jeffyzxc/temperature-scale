import { AbstractControl, ValidationErrors } from "@angular/forms";
import { TemperatureTypeEnum } from "../../../core/service/interface/temperature.interface";

export function temperatureRangeValidator(control: AbstractControl): ValidationErrors | null {

  const temperature = +control?.parent?.get('temperature')?.value;
  const temperatureType = +control?.parent?.get('temperatureType')?.value;

  if (temperatureType === TemperatureTypeEnum.CelciusToFarenheight) {
    if (temperature < -30 || temperature > 200) {
      return { temperatureRange: 'Temperature must be between -30 and 200 degrees Celsius.' };
    }
  } else if (temperatureType === TemperatureTypeEnum.FahrenheitToCelcius) {
    const minFahrenheit = -22;
    const maxFahrenheit = 392;
    if (temperature < minFahrenheit || temperature > maxFahrenheit) {
      return { temperatureRange: 'Temperature must be between -22 and 392 degrees Fahrenheit.' };
    }
  }

  return null;
}
