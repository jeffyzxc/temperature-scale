import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-temperature-scale-chart',
  standalone: true,
  templateUrl: './temperature-scale-chart.component.html',
  styleUrl: './temperature-scale-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers :  [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TemperatureScaleChartComponent),
    }
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TemperatureScaleChartComponent implements AfterViewInit, ControlValueAccessor, OnDestroy  {
  formControl: FormControl = new FormControl();
  private _onDestroy$: Subject<boolean> = new Subject();

  @Output() isDragging: EventEmitter<boolean> = new EventEmitter();

  writeValue(value: number): void {
    this.formControl.setValue(value);
  }
  onTouched = () => {};
  onChange = (value: any) => {};

  registerOnChange(fn: (value : number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngAfterViewInit(): void {
    let isDragging = false;

    document.getElementById("gauge")!.addEventListener("mousedown", (event) => {
      isDragging = true;
      this.isDragging.next(isDragging);
      this.updateGauge(event);
    });

    document.addEventListener("mousemove", (event) => {
      if (isDragging) {
        this.updateGauge(event);
      }
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      this.isDragging.next(isDragging);
    });


    this.drawGauge(this.formControl.value)
    this.formControl.valueChanges.pipe(
      takeUntil(this._onDestroy$)
    ).subscribe((data) => this.drawGauge(data));
  }

  drawGauge(celsius: number) {
    const canvas = document.getElementById("gauge") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const gaugeWidth = 30;
    const gaugeHeight = height - 20;
    const gaugeX = width / 2 - gaugeWidth / 2;
    const gaugeY = 10;

    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(gaugeX, gaugeY, gaugeWidth, gaugeHeight);

    const barHeight = (celsius + 30) / 230 * gaugeHeight;
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(gaugeX, gaugeY + gaugeHeight - barHeight, gaugeWidth, barHeight);

    ctx.fillStyle = "#000";
    ctx.font = "14px Arial";
    for (let i = -30; i <= 200; i += 25) {
      const tickY = gaugeY + gaugeHeight - ((i + 30) / 230) * gaugeHeight;

      if(i <= 10) ctx.fillStyle = "blue";
      else if(i >=20 && i <= 25) ctx.fillStyle = "orange";
      else ctx.fillStyle = "red";

      ctx.fillText(i + "°C", gaugeX - 45, tickY + 5);

    }

    for (let i = -22; i <= 392; i += 50) {
      const fahrenheitTick = (i - 32) * 5 / 9;
      const tickY = gaugeY + gaugeHeight - ((fahrenheitTick + 30) / 230) * gaugeHeight;

      if(i <= 50) ctx.fillStyle = "blue";
      else if(i >=68  && i <= 77) ctx.fillStyle = "orange";
      else ctx.fillStyle = "red";

      ctx.fillText(i + "°F", gaugeX + gaugeWidth + 10, tickY + 5);
    }
  }

  updateGauge(event: MouseEvent) {
    const canvas = document.getElementById("gauge") as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    const gaugeY = rect.top + window.scrollY + 10;
    const gaugeHeight = canvas.height - 20;
    const mouseY = event.clientY - gaugeY + window.scrollY;
    const newBarHeight = Math.min(Math.max(gaugeHeight - mouseY, 0), gaugeHeight);
    const newCelsius = (newBarHeight / gaugeHeight) * 230 - 30;
    this.drawGauge(newCelsius);
    this.onChange(newCelsius);
  }

  ngOnDestroy(): void {
    this._onDestroy$.next(true);
    this._onDestroy$.unsubscribe();
  }

}

