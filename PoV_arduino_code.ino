#include <Servo.h>

const int servoHead = 9;
const int servoLeft = 10;
const int servoRight = 11;

Servo servoHead1;
Servo servoLeft1;
Servo servoRight1;

int headMotorValue = 0;
int bottomMotorValue = 0;
int bottomMotorValueSides = 0;

String inputString = "";         // a string to hold incoming data
boolean stringComplete = false;  // whether the string is complete

void setup() {
  
  Serial.begin(9600);
  
  //inputString.reserve(200);
}

void loop() {

  if (stringComplete) {
    
    inputString = ""; // clear the string:
    stringComplete = false;
    
    if (headMotorValue >= 0 && headMotorValue <= 180) {
      servoHead1.attach(servoHead);
      servoHead1.write(headMotorValue);
      
    } else {
      servoHead1.detach();
    }
    
    if (bottomMotorValue >= -60 && bottomMotorValue <= -30) {
      servoLeft1.attach(servoLeft);
      servoRight1.attach(servoRight);
      servoRight1.write(0);
      servoLeft1.write(180);
      //go Forward

    } else if (bottomMotorValue >= 10 && bottomMotorValue <= 40) {
      servoLeft1.attach(servoLeft);
      servoRight1.attach(servoRight);
      servoRight1.write(180);
      servoLeft1.write(0);
      //go Backward

    } else if (bottomMotorValueSides >= 30 && bottomMotorValueSides <= 50){
      servoLeft1.attach(servoLeft);
      servoLeft1.write(180);
      servoHead1.detach();
      //turn Right
      
    } else if (bottomMotorValueSides <= -30 && bottomMotorValueSides >= -50){
      servoRight1.attach(servoRight);
      servoRight1.write(0);
      servoHead1.detach();
      //turn Left
      
    } else {
      servoLeft1.detach();
      servoRight1.detach();
    }
  }
}

void serialEvent() {

  while (Serial.available()) {  
    
    Serial.write("OK"); //handshake

    char inChar = (char)Serial.read(); // get the new byte
    inputString += inChar; // add it to the inputString:
    
    // if the incoming character is a newline, set a flag
    // so the main loop can do something about it:
    
    if (inChar == '\n') {
      headMotorValue = inputString.substring(0, inputString.indexOf(',')).toInt();
      bottomMotorValue = inputString.substring(inputString.indexOf(',') + 1).toInt();
      bottomMotorValueSides = inputString.substring(inputString.lastIndexOf(',') +1).toInt();
      stringComplete = true;
      
    }
  }
}
