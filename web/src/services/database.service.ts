import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiData } from '../app/datatypes/weather';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = 'http://localhost:4202'; // Deine API-URL

  constructor(private http: HttpClient) {}

  /**
   * Ruft alle Sensordaten von der API ab.
   */
  getAllData(): Observable<apiData> {
    return this.http.get<apiData>(`${this.apiUrl}/get/all/data`);
  }

  getSensors(): Observable<apiData> {
    return this.http.get<apiData>(`${this.apiUrl}/get/all/sensors`);
  }

  /**
   * Ruft die Sensordaten für einen bestimmten Sensor ab.
   * @param sensor Der Name des Sensors.
   */
  getWeatherDataBySensor(sensor: string): Observable<apiData> {
    return this.http.get<apiData>(`${this.apiUrl}/get/${sensor}/data/all/`);
  }

  /**
   * Ruft die letzten Sensordaten für einen bestimmten Sensor ab.
   * @param sensor Der Name des Sensors.
   */
  getLastWeatherDataBySensor(sensor: string): Observable<apiData> {
    return this.http.get<apiData>(`${this.apiUrl}/get/${sensor}/data/last`);
  }

  /**
   * Ruft Sensordaten seit einem bestimmten Datum ab.
   * @param startDate Das Startdatum im ISO-Format.
   */
  getWeatherDataSince(startDate: string): Observable<apiData> {
    return this.http.get<apiData>(`${this.apiUrl}/get/data/since/${startDate}`);
  }

  getDataOrderedByMonthBySensor(sensor:string, year:number): Observable<apiData>{
    return this.http.get<apiData>(`${this.apiUrl}/get/${sensor}/monthlyordered/${year}`);
  }

  getDataOrderedByMonth(year:number){
    return this.http.get<apiData>(`${this.apiUrl}/get/monthlyordered/${year}`);
  }

  getMonthlyDataBySensor(sensor:string){
    return this.http.get<apiData>(`${this.apiUrl}/get/${sensor}/monthly/log)`);
  }
  getMonthlyData(){
    return this.http.get<apiData>(`${this.apiUrl}/get/all/monthly/log)`);
  }

  /**
   * Fügt neue Sensordaten in die Datenbank ein.
   * @param weatherData Die zu speichernden Sensordaten.
   */
  insertWeatherData(weatherData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/insert/weatherdata`, weatherData);
  }
}