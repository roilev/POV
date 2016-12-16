//Global variables
var rawData;
var orData;
var rawDataLast;
var lerpData;

var rawData1;
var orData1;
var rawDataLast1;
var lerpData1;

var rawData2;
var orData2;
var rawDataLast2;
var lerpData2;

var dataToSend = [];

//Setup socket
var socket = io();

function setup(){
	createCanvas(window.innerWidth, window.innerHeight);
}
function draw(print){
  //Store the data
  
  rawData = rotationZ;
  lerpData = lerp(rawDataLast, rawData, 0.1);
  rawDataLast = rawData;
  orData = lerpData;
  //console.log(orData);
  
  rawData1 = rotationY;
  lerpData1 = lerp(rawDataLast1, rawData1, 0.1);
  rawDataLast1 = rawData1;
  orData1 = lerpData1;
  //orData1 = map(lerpData1, -90, 90, 0, 180);
  //console.log(orData1);
  
  rawData2 = rotationX;
  lerpData2 = lerp(rawDataLast2, rawData2, 0.1);
  rawDataLast2 = rawData2;
  orData2 = lerpData2;
  
  dataToSend = [parseInt(orData),parseInt(orData1),parseInt(orData2)];
}

setInterval(function(){
   socket.emit('sendOrData',dataToSend);
}, 100);
