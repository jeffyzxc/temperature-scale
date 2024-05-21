import { Component, OnDestroy, OnInit } from '@angular/core';
import { TemperatureScaleChartComponent } from './component/formControl/temperature-scale-chart/temperature-scale-chart.component';
import { TemperatureDataService } from './service/temperature.data.service';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemperatureTypeEnum } from '../../core/service/interface/temperature.interface';
import { CommonModule } from '@angular/common';
import { temperatureRangeValidator } from './validators/temperatureRangeValidator';

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

  result = 0;
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
      temperature: [32, temperatureRangeValidator.bind(this)],
      temperatureType: ['0',  temperatureRangeValidator.bind(this)],
    });

    this.temperatureFormGroup.valueChanges.pipe(
      takeUntil(this._destroyer$)
    ).subscribe((data) => {
      if(data['temperature']?.toString())
        this.onChangeValueChange(+data['temperatureType'], +data['temperature']);
    });

    this.temperatureFormGroup?.get('temperatureType')?.valueChanges.pipe(
      takeUntil(this._destroyer$)
    ).subscribe(() => {
      const temp = this.result;
      this.result = this.temperatureFormControlValue;
      this.temperatureFormGroup?.get('temperature')?.setValue(temp);
    });

    this.temperatureBarFormControl.valueChanges.pipe(
      takeUntil(this._destroyer$),
      switchMap((data) => this.onBarValueChange(parseInt(data) ))
    ).subscribe();
  }

  onBarValueChange(data: number) {
    return this.temperatureDataService.fetch({type: TemperatureTypeEnum.CelciusToFarenheight, value: data}).pipe(tap(((result) => {
      if(TemperatureTypeEnum.CelciusToFarenheight === +this.temperatureTypeFormControlValue)  {
          this.temperatureFormGroup?.get('temperature')?.setValue(data);
          this.result = result;
      } else {
          this.result = data;
          this.temperatureFormGroup?.get('temperature')?.setValue(result);
        }
    })))
  }

  onChangeValueChange(type: TemperatureTypeEnum, value: number) {
    if(!this.temperatureFormGroup.valid || this.isBarDragging) return;
    this.temperatureDataService.fetch({type, value}).subscribe((data) =>{
      this.result = data;

      if(TemperatureTypeEnum.CelciusToFarenheight === +this.temperatureTypeFormControlValue)  {
        this.temperatureBarFormControl.setValue(value, {onlySelf: true, emitEvent: false})
      } else {
        this.temperatureBarFormControl.setValue(data, {onlySelf: true, emitEvent: false})
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
