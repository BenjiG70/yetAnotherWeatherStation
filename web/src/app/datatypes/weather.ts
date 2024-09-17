export interface WeatherData {
    datetime: string;
    id: number;
    temperature: number;
    humidity: number;
    air_pressure: number;
    sensor: string;
    regen: number;
  }

export interface apiData {
  [key:string]: WeatherData;
}