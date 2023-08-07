// Developer By : Azozz ALFiras
// Created Wed 19 Jul 5:45 AM

const express = require('express'); // make flexible Node.js web application framework
var plist = require('plist');
const request = require('request');
var app = express(); // make variable
const bodyparser = require('body-parser'); // Node.js body parsing middleware.
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));



// Read File .mobileprovision

app.post('/ReadFile', function (req, res) {
const url = req.body.url;
console.log("Requested");
request.get(url, function(err, res1, body) {
  // Body is the example.docx data.
if (err) throw err;
const obj            = plist.parse(body);
const AppIDName      = obj["AppIDName"];
const TeamIdentifier = obj["TeamIdentifier"][0];
const TeamName       = obj["TeamName"];
const CreationDate   = obj["CreationDate"];
const ExpirationDate = obj["ExpirationDate"];
const UUID           = obj["UUID"];
const AppID          = obj["Entitlements"]["application-identifier"];
return res.send({
    "Name":`iPhone Distribution: ${TeamName} (${TeamIdentifier})`,
    "AppID":AppID,
    "AppIDName":AppIDName,
    "TeamIdentifier":TeamIdentifier,
    "TeamName":TeamName,
    "CreationDate":CreationDate,
    "ExpirationDate":ExpirationDate,
    "UUID":UUID
});
});
});






// open broswer on this -> "localhost:4000"
var port = process.env.PORT || 1539
console.log("Running on port:" + port)
app.listen(port);





