
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var orData=[];
var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var proc;

var serialport = require('serialport'),
    SerialPort = serialport.SerialPort,
    portname = '/dev/ttyACM0';

var myPort = new SerialPort(portname, {
  baudRate: 9600,
  options: false,
  parser: serialport.parsers.readline('\r\n')
});

app.set("views", __dirname + '/views');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static( __dirname + '/public' ));


//serve index.html
app.get('/', function(req, res){
  res.render('index');
});

//listen on port
http.listen(3000, function(){
  console.log('listening on *:3000');
});

//Socket.io Setup

//open websocket
io.on('connection', function(client){
  console.log('user ' + client.id + ' connected');
      client.on('sendOrData', function(data){
        orData = data;
      });
      
io.on('disconnect', function(){
    console.log('user disconnected');
  });

});

myPort.on('open', openPort); // called when the serial port opens

function openPort() {
    console.log('port open');
    console.log('baud rate: ' + myPort.options.baudRate);

    function sendData() {
		 var first = orData[0];
		 var second = orData[1];
		 var third = orData[2];
		 
		 if(orData[0] != undefined){
			myPort.write(first + ',' + second + ',' + third +'\n');
			console.log('Sending ' + first + ',' + second + ',' + third + ' out the serial port');
			orData[0] = undefined;
			orData[1] = undefined;
			orData[2] = undefined;
	 }
    }
    // set an interval to update every 30 millisec:
  setInterval(sendData, 30);
}
