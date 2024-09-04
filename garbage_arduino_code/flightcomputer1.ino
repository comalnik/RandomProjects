#include <SPI.h>
#include <SD.h>
#include <Arduino.h>
#include <Wire.h>
#include <Arduino_BMI270_BMM150.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP3XX.h>
#include "SensorFusion.h" 

SF fusion;
const int chipSelect = 10;
Adafruit_BMP3XX bmp;
#define BMP_CS 9
const int ledPin = 6;
const int buzzPin = 3;  


File myFile;



float initialAltitude = 0;
float pressure, altitude, temperature;

float gx, gy, gz, ax, ay, az, mx, my, mz, gdx, gdy, gdz;
float pitch, roll, yaw;
float deltat;

float convertDegreesToRadians(float degrees) {
  return degrees * (PI / 180.0);
}


void setup() {
  // Open serial communications and wait for port to open:
  Serial1.begin(9600);
  // wait for Serial Monitor to connect. Needed for native USB port boards only:
  if (!IMU.begin()) {
    Serial.println("Failed to initialize BMI270_BMM150!");
    while (1);
  }
  if (!bmp.begin_SPI(BMP_CS)) {
    Serial.println("Failed to initialize BMP3XX in SPI mode!");
    while (1);
  }
  bmp.setTemperatureOversampling(BMP3_OVERSAMPLING_8X);
  bmp.setPressureOversampling(BMP3_OVERSAMPLING_4X);
  bmp.setIIRFilterCoeff(BMP3_IIR_FILTER_COEFF_3);
  bmp.setOutputDataRate(BMP3_ODR_50_HZ);

  bmp.performReading();
  delay(1000);
  bmp.performReading();
  initialAltitude =  bmp.readAltitude(1013.25);

  

  digitalWrite(buzzPin, HIGH);
  digitalWrite(ledPin, HIGH);
  delay(200);
  digitalWrite(buzzPin, LOW);
  digitalWrite(ledPin, LOW);
  delay(200);
  digitalWrite(buzzPin, HIGH);
  digitalWrite(ledPin, HIGH);
  delay(200);
  digitalWrite(buzzPin, LOW);
  digitalWrite(ledPin, LOW);


  }






void loop() {
  IMU.readAcceleration(ax, ay, az);
  IMU.readGyroscope(gdx, gdy, gdz);
  //IMU.readMagneticField(mx, my, mz);

  gx = convertDegreesToRadians(gdx);
  gy = convertDegreesToRadians(gdy);
  gz = convertDegreesToRadians(gdz);

  deltat = fusion.deltatUpdate();
  //fusion.MahonyUpdate(gx, gy, gz, ax, ay, az, deltat);
  fusion.MadgwickUpdate(gx, gy, gz, ax, ay, az, deltat);
  pitch = fusion.getPitch();
  roll = fusion.getRoll();    
  yaw = fusion.getYaw();



  bmp.performReading();
  float currentAltitude = bmp.readAltitude(1013.25);


  Serial1.print(pitch);
  Serial1.print(",");
  Serial1.print(roll);
  Serial1.print(",");
  Serial1.print(yaw);
  Serial1.print(",");
  Serial1.print(gx);
  Serial1.print(",");
  Serial1.print(gy);
  Serial1.print(",");
  Serial1.print(gz);
  //Serial1.print(",");
  //Serial1.print(ax);
  //Serial.print(",ay:");
  //Serial.print(ay);
  //Serial.print(",az:");
  //Serial.print(az);
  Serial1.print(",");
  Serial1.print(currentAltitude - initialAltitude);
  //Serial.print(bmp.pressure / 100.0);
  Serial1.print(",");
  Serial1.print(bmp.temperature);
  Serial1.print("\n");




}