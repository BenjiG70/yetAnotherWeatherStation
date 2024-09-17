const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 4202;

app.use(cors());
app.use(bodyParser.json());

// connect to database
const db = new sqlite3.Database('weather.sqlite');

db.serialize(() => {
    db.run(`
          CREATE TABLE IF NOT EXISTS HISTORY (
          ID INTEGER PRIMARY KEY,
          DATE_TIME TEXT,
          temperature NUMBER,
          humidity NUMBER,
          air_pressure NUMBER,
          sensor TEXT,
          regen INTEGER
          );
      `);
})

//used in every select query
function getData(sql, res){
    db.all(sql, [], (err, rows) => {
        if (err) {
          res.status(400).send(err.message);
          return;
        }
        const result = {};
        rows.forEach((row) => {
          result[row.ID] = row;
        });
        res.status(200).json(result);
      });
}
//used in delete, update and insert query
function changeData(sql, res){
    db.run(sql, [], (err, rows) => {
        if (err) {
          res.status(400).send(err.message);
          return;
        }
        const result = {};
        rows.forEach((row) => {
          result[row.ID] = row;
        });
        res.status(200).json(result);
      });
}


//item endpoints
// Get all items 
  app.get('/get/all/weather/all', (req, res) => {
    const sql = `SELECT * FROM HISTORY`;
    getData(sql, res);
  });

  app.get('/get/all/weather/:sensor', (req, res) => {
    const sensor = req.params.sensor;
    const sql = `SELECT * FROM HISTORY WHERE sensor = "${sensor}"`;
    getData(sql, res)
  });

  app.get('/get/last/weather/:sensor', (req, res) => {
    const sensor = req.params.sensor;
    const sql = `SELECT * FROM HISTORY WHERE sensor = "${sensor}" ORDER BY ID DESC LIMIT 1`;
    getData(sql, res)
  });
  
  app.get('/get/monthly/data/:sensor/:year', (req, res) => {
    const sensor = req.params.sensor;
    const year = req.params.year;
    const sql = `SELECT COUNT(regen) FROM HISTORY WHERE sensor = "${sensor}" AND date_time like ${year} ORDER BY Month`;
    getData(sql, res);
  });

  // Get all sensors with their latest data
//   app.get('/get/all/sensors', (req, res) => {
//     const sql = `
//         SELECT * FROM HISTORY
//         WHERE (sensor, DATE_TIME) IN (
//             SELECT sensor, MAX(DATE_TIME)
//             FROM HISTORY
//             GROUP BY sensor
//         )
//     `;
//     getData(sql, res);
// });
app.get('/get/all/sensors', (req, res) => {
  const sql = `SELECT DISTINCT(sensor) FROM HISTORY`;
  getData(sql, res);
});

app.get('/get/weather/since/:dateTime', (req, res) => {
    const dateTime = req.params.dateTime;
    const sql = `SELECT * FROM HISTORY WHERE DATE_TIME >= ?`;
    db.all(sql, [dateTime], (err, rows) => {
      if (err) {
        res.status(400).send(err.message);
        return;
      }
      const result = {};
      rows.forEach((row) => {
        result[row.ID] = row;
      });
      res.status(200).json(result);
    });
  });
  

  app.post('insert/weatherdata', (req, res) => {
    const id = getData("SELECT MAX(ID) FROM HISTORY", res) + 1;
    const temperature = req.body.temperature;
    const humidity = req.body.humidity;
    const air_pressure = req.body.air_pressure;
    const sensor = req.body.sensor;
    const datetime = new Date();

    const sql = `INSERT INTO HISTORY(ID, temperature, humidity, air_pressure, sensor, date_time) 
                VALUES(${id}, ${temperature}, ${humidity}, ${air_pressure}, "${sensor}", "${datetime}");`
    changeData(sql, res)
  });

//listening message
app.listen(port, () => {    
    console.log(`Server läuft auf http://localhost:${port}`);
});