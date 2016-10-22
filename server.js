var express = require("express");
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var mongoose = require('mongoose');       
var port     = process.env.PORT || 8080;  
var database = require('./config/database');  
var bodyParser = require('body-parser');
var morgan = require('morgan');

mongoose.connect(database.url);   // connect to mongoDB database on modulus.io
app.use(express.static('public'));
app.use(morgan('combined'));             // log every request to the console
app.use(bodyParser.json());              // pull information from html in POST

app.get('/', function(req, res){
  res.sendFile('public/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});


server.listen(port, function(){
  console.log('listening on port: ' + port);
});



