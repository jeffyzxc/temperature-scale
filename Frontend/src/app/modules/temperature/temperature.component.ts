import { Component, OnDestroy, OnInit } from '@angular/core';
import { TemperatureScaleChartComponent } from './component/formControl/temperature-scale-chart/temperature-scale-chart.component';
import { TemperatureDataService } from './service/temperature.data.service';
import { Subject, debounceTime, startWith, switchMap, takeUntil, tap } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemperatureTypeEnum } from '../../core/service/interface/temperature.interface';
import { CommonModule } from '@angular/common';
import { celciusToFarenheitRangeValidator, farenheightToCelciusValidator } from './validators/temperatureRangeValidator';

@Component({
  selector: 'app-temperature',
  standalone: true,
  imports: [
    TemperatureScaleChartComponent,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './temperature.component.html',
  styleUrl: './temperature.component.scss'
})
export class TemperatureComponent implements OnInit, OnDestroy {

  isBarDragging: boolean = false;

  TemperatureTypeEnum = TemperatureTypeEnum;

  temperatureBarFormControl: FormControl = new FormControl(0);
  temperatureFormGroup!:FormGroup;
  private _destroyer$: Subject<boolean> = new Subject();

  constructor(
    private temperatureDataService: TemperatureDataService,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.temperatureFormGroup = this.fb.group({
      celciusToFarenheit: [0, celciusToFarenheitRangeValidator.bind(this)],
      farenheitToCelcius: [, farenheightToCelciusValidator.bind(this)]
    });

    this.temperatureFormGroup.get('celciusToFarenheit')?.valueChanges.pipe(
      startWith(this.temperatureFormGroup.get('celciusToFarenheit')?.value),
      takeUntil(this._destroyer$)
    ).subscribe((data) => {
      this.onChangeValueChange(TemperatureTypeEnum.CelciusToFarenheight, data)
    });

    this.temperatureFormGroup.get('farenheitToCelcius')?.valueChanges.pipe(
      takeUntil(this._destroyer$)
    ).subscribe((data) => {
      this.onChangeValueChange(TemperatureTypeEnum.FahrenheitToCelcius, data)
    });

    this.temperatureBarFormControl.valueChanges.pipe(
      takeUntil(this._destroyer$),
      switchMap((data) => this.onBarValueChange(data))
    ).subscribe();
  }

  onBarValueChange(data: number) {
    return this.temperatureDataService.fetch({type: TemperatureTypeEnum.CelciusToFarenheight, value: data}).pipe(tap(((result) => {
        this.temperatureFormGroup?.get('celciusToFarenheit')?.setValue(+data, {onlySelf: true, emitEvent: false});
        this.temperatureFormGroup?.get('farenheitToCelcius')?.setValue(+result, {onlySelf: true, emitEvent: false});
    })))
  }

  onChangeValueChange(type: TemperatureTypeEnum, value: number) {
    this.temperatureDataService.fetch({type, value}).subscribe((data) =>{

      if(TemperatureTypeEnum.CelciusToFarenheight === +type && this.temperatureFormGroup.get('celciusToFarenheit')?.valid)  {
        this.temperatureFormGroup?.get('celciusToFarenheit')?.setValue(+value, {onlySelf: true, emitEvent: false});
        this.temperatureFormGroup?.get('farenheitToCelcius')?.setValue(+data, {onlySelf: true, emitEvent: false});
        this.temperatureBarFormControl.setValue(+value, {onlySelf: true, emitEvent: false});
      } else if(this.temperatureFormGroup.get('farenheitToCelcius')?.valid){
        this.temperatureFormGroup?.get('celciusToFarenheit')?.setValue(+data, {onlySelf: true, emitEvent: false});
        this.temperatureFormGroup?.get('farenheitToCelcius')?.setValue(+value, {onlySelf: true, emitEvent: false});
        this.temperatureBarFormControl.setValue(+data, {onlySelf: true, emitEvent: false});
      }
    });
  }

  onDraggingChart(isDragging: boolean) {
    this.isBarDragging = isDragging;
  }

  get temperatureFormControlValue() {
    return this.temperatureFormGroup.value['temperature']
  }

  get temperatureTypeFormControlValue() {
    return this.temperatureFormGroup.value['temperatureType']
  }

  get temperatureBarFormControlValue() {
    return this.temperatureBarFormControl.value;
  }


  ngOnDestroy(): void {
    this._destroyer$.next(true);
    this._destroyer$.unsubscribe();
  }

}
