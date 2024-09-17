import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherData, apiData } from '../app/datatypes/weather';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = 'http://localhost:4202'; // Deine API-URL

  constructor(private http: HttpClient) {}

  /**
   * Ruft alle Sensordaten von der API ab.
   */
  getAllSensors(): Observable<apiData> {
    return this.http.get<apiData>(`${this.apiUrl}/get/all/weather/all`);
  }

  getAllSensor(): Observable<apiData> {
    return this.http.get<apiData>(`${this.apiUrl}/get/all/sensors`);
  }

  /**
   * Ruft die Sensordaten für einen bestimmten Sensor ab.
   * @param sensorName Der Name des Sensors.
   */
  getWeatherDataBySensor(sensorName: string): Observable<apiData> {
    return this.http.get<apiData>(`${this.apiUrl}/get/all/weather/${sensorName}`);
  }

  /**
   * Ruft die letzten Sensordaten für einen bestimmten Sensor ab.
   * @param sensorName Der Name des Sensors.
   */
  getLastWeatherDataBySensor(sensorName: string): Observable<apiData> {
    return this.http.get<apiData>(`${this.apiUrl}/get/last/weather/${sensorName}`);
  }

  /**
   * Ruft Sensordaten seit einem bestimmten Datum ab.
   * @param startDate Das Startdatum im ISO-Format.
   */
  getWeatherDataSince(startDate: string): Observable<apiData> {
    return this.http.get<apiData>(`${this.apiUrl}/get/weather/since/${startDate}`);
  }

  getMonthlyDataBySensor(sensor:string, year:number): Observable<apiData>{
    return this.http.get<apiData>(`${this.apiUrl}/get/monthly/data/${sensor}/${year}`)
  }

  /**
   * Fügt neue Sensordaten in die Datenbank ein.
   * @param weatherData Die zu speichernden Sensordaten.
   */
  insertWeatherData(weatherData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/insert/weatherdata`, weatherData);
  }
}
