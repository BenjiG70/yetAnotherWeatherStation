#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

Adafruit_BME280 bme;

void setup() {
  Serial.begin(115200);
  
  // Definiere benutzerdefinierte I²C-Pins: SDA auf D6 (GPIO12), SCL auf D5 (GPIO14)
  Wire.begin(D6, D5);  // Wire.begin(SDA, SCL)
  
  if (!bme.begin(0x76)) {
    Serial.println("BME280 nicht gefunden!");
    while (1);
  }
}

void loop() {
  Serial.print("Temperatur = ");
  Serial.print(bme.readTemperature());
  Serial.println(" °C");
  
  delay(1000);
}
