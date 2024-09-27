import { Component, ViewChild, ElementRef, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatabaseService } from '../../../services/database.service';
import { WeatherEntry} from '../../datatypes/weather'

@Component({
  selector: 'app-sensor-details-dialog',
  templateUrl: './sensor-details-dialog.component.html',
  styleUrls: ['./sensor-details-dialog.component.scss'] // Korrigiere styleUrl zu styleUrls
})

export class SensorDetailsDialogComponent implements OnInit {

  

  weatherDataList: WeatherEntry[] = [];

  @ViewChild('myCanvas', { static: false }) myCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  constructor(private db: DatabaseService, @Inject(MAT_DIALOG_DATA) public data: any) {}

  private avgTemp:any;

  ngOnInit() {
    this.getAlltimeData(this.data.sensorName);
  }

  avgData(){
    this.db.getTempAVGDataBySensor(this.data.sensorName).subscribe(
      data => {
        this.avgTemp = data[0];
      }
      
    );console.log(this.avgTemp);
  }

  /**
   * 
   * @param sensorName 
   */
  getAlltimeData(sensorName: string) {
    this.db.getWeatherDataBySensor(sensorName).subscribe(
      data => {
        this.weatherDataList = [];
        const keys = Object.keys(data);
        keys.forEach(key => {
          const item = data[key];
          this.weatherDataList.push({
            date: item.DATE_TIME,
            regen: item.regen,
            temperature: item.temperature,
            air_pressure: item.air_pressure,
            humidity: item.humidity
          });
          this.buildStatsData(this.weatherDataList, 0)
        });
        

      },
      error => {
        console.error('Fehler beim Abrufen der Wetterdaten:', error);
      }
    );
  }
  
  drawChart(data:any[], labels:any[]) {
    //const data = [0,1,0,1,0,1,0,1,0,1,0,1]; //this.weatherDataList.map(entry => entry.regen); // Beispiel: regen-Werte für das Diagramm
    //const labels = ["Januar", "Februar", "März","April", "Mai", "Juni","Juli", "August", "September","Oktober", "November", "Dezember"]; // Beispiel: Datumsbeschriftungen
    const barWidth = 10;
    const barSpacing = 10;
    const maxBarHeight = 300;
    const canvasWidth = 500;
    const canvasHeight = 400;

    if (!this.ctx) return;

    // Hintergrund füllen
    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    this.ctx.fillStyle = '#f0f0f0';
    this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Balken zeichnen
    data.forEach((value, index) => {
      const x = index * (barWidth + barSpacing) + barSpacing;
      const y = maxBarHeight - (value / 100) * maxBarHeight;
      const height = (value / 100) * maxBarHeight;

      // Balkenfarbe
      this.ctx.fillStyle = '#4caf50';
      this.ctx.fillRect(x, y, barWidth, height);

      // Beschriftung der Balken
      this.ctx.fillStyle = '#000';
      this.ctx.save(); // Kontext speichern
      this.ctx.translate(x + 10, maxBarHeight + 20); // Verschieben auf die Position der Beschriftung
      this.ctx.rotate(-Math.PI / 2); // 90 Grad gegen den Uhrzeigersinn rotieren
      this.ctx.textAlign = 'right'; // Textausrichtung
      this.ctx.fillText(labels[index], 0, 0); // Beschriftung zeichnen
      this.ctx.restore(); // Kontext zurücksetzen
    });
  }
  /**
   * 
   * @param sensorData 
   * @param type: 0 = yearly; 1 = monthly; 2 = daily
   */
  buildStatsData(sensorData:any[], type:number){
    const data = sensorData;
    switch(type){
      case(0):
        console.log("hello world");
        const labels = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
        const data = [12, 14, 10, 0, 0, 0, 0, 1, 6, 20, 25, 24];
        this.ctx = this.myCanvas.nativeElement.getContext('2d')!;
        this.drawChart(data, labels);
        break;
      case(1):
        console.log("hello world!");
        //tbd
        break;
      case(2):
        console.log("hello world!1");
        //tbd
        break;
    }
  }
}
