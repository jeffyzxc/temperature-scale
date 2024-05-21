import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TemperatureAPIService } from "../../../core/service/temperature.api.service";
import { GetTemperatureRequest } from "../../../core/service/interface/temperature.interface";


@Injectable(
  {
    providedIn: 'root',
  }
)
export class TemperatureDataService {

  constructor(private api: TemperatureAPIService) {}

  fetch(request: GetTemperatureRequest) {
    return this.api.get(request);
  }
}


