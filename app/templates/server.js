#!/usr/bin/env node

/**
 * Module dependencies.
 */
var express = require('express');
var app = express();
var path = require('path');

var port = 3000;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.use(express.static(path.join(__dirname, '/')));

app.listen(port);
console.log('Listening at http://localhost:' + port);
