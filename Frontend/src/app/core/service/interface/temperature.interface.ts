export enum TemperatureTypeEnum {
  FahrenheitToCelcius,
  CelciusToFarenheight
}


export interface GetTemperatureRequest {
  type: TemperatureTypeEnum,
  value: number
}
