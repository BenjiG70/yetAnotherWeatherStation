import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { WeatherData, apiData } from '../../datatypes/weather';

interface WeatherEntry {
  date: string;
  regen: number;
  temperature: number;
  air_pressure: number;
  humidity: number;
}

@Component({
  selector: 'app-sensor-details-dialog',
  templateUrl: './sensor-details-dialog.component.html',
  styleUrls: ['./sensor-details-dialog.component.scss'] // Korrigiere styleUrl zu styleUrls
})

export class SensorDetailsDialogComponent implements OnInit {

  weatherDataList: WeatherEntry[] = [];

  @ViewChild('myCanvas', { static: false }) myCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  constructor(private db: DatabaseService) {}

  ngOnInit() {
    this.getMonthlyData("sensor_1");
  }

  getMonthlyData(sensorName: string) {
    this.db.getWeatherDataBySensor(sensorName).subscribe(
      data => {
        this.weatherDataList = [];

        const keys = Object.keys(data);
        keys.forEach(key => {
          const item = data[key];
          this.weatherDataList.push({
            date: item.datetime,
            regen: item.regen,
            temperature: item.temperature,
            air_pressure: item.air_pressure,
            humidity: item.humidity
          });
        });

        // Zeichne das Diagramm nach dem Daten-Update
        if (this.myCanvas.nativeElement) {
          this.ctx = this.myCanvas.nativeElement.getContext('2d')!;
          this.drawChart();
        }
      },
      error => {
        console.error('Fehler beim Abrufen der Wetterdaten:', error);
      }
    );
  }

  drawChart() {
    const data = [0,1,0,1,0,1,0,1,0,1,0,1]; //this.weatherDataList.map(entry => entry.regen); // Beispiel: regen-Werte für das Diagramm
    const labels = ["Januar", "Februar", "März","April", "Mai", "Juni","Juli", "August", "September","Oktober", "November", "Dezember"]; // Beispiel: Datumsbeschriftungen
    const barWidth = 30;
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
}
