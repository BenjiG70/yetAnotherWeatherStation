#include <WiFi.h>
#include <HTTPClient.h>

// WiFi credentials
const char* ssid = "your_SSID";
const char* password = "your_password";

// Server URL
const char* serverUrl = "http://your-server-ip:4202/insert/data"; //IP from the RaspberryPi on Port 4202 and insert url to insert actual sensordata

//sensordefinition
// TBD

void getSensorData(){
  //TBD
}

void connectWifi(){
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Verbindung zu WiFi...");
  }
}

void sendData(){
  getSensorData();
  connectWifi();
  if (WiFi.status() == WL_CONNECTED) {
    // Initialize HTTP client
    HTTPClient http;

    // Prepare JSON payload
    String jsonData = "{\"temperature\":" + String(temperature, 1) +
                      ",\"humidity\":" + String(humidity, 1) +
                      ",\"air_pressure\":" + String(airPressure, 1) +
                      ",\"sensor\":\"" + sensorName + "\"}";

    // Send POST request
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    int httpResponseCode = http.POST(jsonData);

    // Check for successful request
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Server Antwort: " + response);
    } else {
      Serial.println("Fehler bei der Anfrage: " + String(httpResponseCode));
    }
    http.end();
  }
}

void setup() {
  // Beginne die serielle Kommunikation mit einer Baudrate von 9600
  Serial.begin(9600);

  // Ausgabe einer Nachricht, wenn der ESP8266 aufwacht
  Serial.println("Der ESP8266 ist aufgewacht!");
  sendData();
}

void loop() {

  // Gib dem ESP8266 Zeit, die Nachricht zu senden, bevor er in den Deep-Sleep-Modus geht
  delay(1000);

  // ESP8266 in den Deep-Sleep-Modus versetzen
  // Die Zeit ist in Mikrosekunden angegeben
  // 1 Sekunde = 1.000.000 Mikrosekunden
  // In diesem Fall wird der ESP8266 alle 15 Minuten aufwachen
  ESP.deepSleep(9e8);
}