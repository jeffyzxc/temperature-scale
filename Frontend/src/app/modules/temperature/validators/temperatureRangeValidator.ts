import { AbstractControl, ValidationErrors } from "@angular/forms";

export function celciusToFarenheitRangeValidator(control: AbstractControl): ValidationErrors | null {
  const temperature = +control?.value;
  if (temperature < -30 || temperature > 200) {
    return { temperature: 'Temperature must be between -30 and 200 degrees Celsius.' };
  }

  return null;
}

export function farenheightToCelciusValidator(control: AbstractControl): ValidationErrors | null {
  const temperature = +control?.value;
  const minFahrenheit = -22;
  const maxFahrenheit = 392;
  if (temperature < minFahrenheit || temperature > maxFahrenheit) {
    return { temperature: 'Temperature must be between -22 and 392 degrees Fahrenheit.' };
  }

  return null;
}
