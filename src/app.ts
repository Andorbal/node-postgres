/// <reference path="../typings/tsd.d.ts" />

import * as express from 'express';

let app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'jade');

app.get('/', (req, res) =>
  res.render("hello", {title: "Hi!", message: "Hello Blanksy..."}));

let server = app.listen(3000, function() {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

// Handle a SIGINT because Node won't stop when running in Docker
// without it
process.on('SIGINT', function() {
  server.close();
  process.exit(0);
});
