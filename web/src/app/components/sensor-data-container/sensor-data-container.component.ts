import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sensor-data-container',
  templateUrl: './sensor-data-container.component.html',
  styleUrl: './sensor-data-container.component.scss'
})



export class SensorDataContainerComponent{
  weatherData: any;

  @Input() sensorname:string = "undefined";
  @Input() temperatur:string = "undefined";
  @Input() luftfeuchte:string = "undefined";
  @Input() luftdruck:string = "undefined";
  @Input() regen:boolean = false;
  @Input() zeit:string ="undefined";
}
