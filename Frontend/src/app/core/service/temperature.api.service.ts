import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { GetTemperatureRequest, TemperatureTypeEnum } from "./interface/temperature.interface";
import { objToQueryParams } from "../utils/params.utils";



@Injectable(
  {
    providedIn: 'root',
  }
)
export class TemperatureAPIService {

  constructor(private http: HttpClient) {}

  get(request: GetTemperatureRequest) {
    return this.http.get<number>(`${environment.apiUrl}Temperature?${objToQueryParams(request)}`, );
  }
}


