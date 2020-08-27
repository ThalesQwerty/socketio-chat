const Server = require("./Server");

const express = require("express");
const favicon = require('express-favicon');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();

const DIR = __dirname.replace("\\server", "");
console.log("Build path: " + DIR);

app.listen(port);
console.log("Listening on " + port);

app.use(express.static(DIR));
app.use(express.static(path.join(DIR, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(DIR, 'build', 'index.html'));
});

Server.start();

