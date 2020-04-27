//jshint esversion:6

const express = require("express");
const https = require("https");
const ejs = require("ejs");
const favicon = require("serve-favicon");
const path = require("path");

const app = express();
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(favicon(path.join(__dirname, "public", "favicon.png")));

var d = new Date();
var year = d.getFullYear();

app.get("/", function (req, res) {
  const reportsUrl = "https://covid-api.com/api/reports?q=south africa&iso=ZAF";

  https.get(reportsUrl, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const reportData = JSON.parse(data);
      console.log(reportData);
      const confirmed = reportData.data[0].confirmed;
      const active = reportData.data[0].active;
      const recovered = reportData.data[0].recovered;
      const deaths = reportData.data[0].deaths;
      const newActive = reportData.data[0].active_diff;
      const newRecovered = reportData.data[0].recovered_diff;
      const newDeaths = reportData.data[0].deaths_diff;
      const fatalityRate = reportData.data[0].fatality_rate * 100;
      const lastUpdate = reportData.data[0].last_update;
      //console.log(confirmed, active, recovered, deaths);
      res.render("index", {
        confirmed: confirmed,
        active: active,
        recovered: recovered,
        deaths: deaths,
        newActive: newActive,
        newRecovered: newRecovered,
        newDeaths: newDeaths,
        fatalityRate: fatalityRate,
        lastUpdate: lastUpdate,
        year: year,
      });
    });
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
