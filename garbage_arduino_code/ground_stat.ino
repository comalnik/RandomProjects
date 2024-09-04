#include <SoftwareSerial.h>

// Create a SoftwareSerial object to communicate with the HC-12 module
SoftwareSerial HC12(5, 4); // HC-12 TX Pin, HC-12 RX Pin

void setup() {
  Serial.begin(9600);  // Initialize the serial port to communicate with the computer at 9600 baud
  HC12.begin(9600);    // Initialize the HC-12 serial port at 2400 baud
}

void loop() {
  // Check if there is data available from the HC-12 module
  while (HC12.available()) {        // If HC-12 has data
    Serial.write(HC12.read());      // Send the data to Serial monitor
  }
}