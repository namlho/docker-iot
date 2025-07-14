import express from 'express';
import { PrismaClient } from '@prisma/client';
import https from 'https';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import iot from './routes/iotRoutes.js';
// import '../BE-DX/controllers/MQTT/mqtt-client.js'; // Add this line to import MQTT client
import './Database/mqtt.database.js'; // Ensure this is the correct path to your MQTT database file
import { configureSSL } from './config/ssl.js';


dotenv.config();

const app = express();
const prisma = new PrismaClient();
// In your index.js
const port = process.env.PORT || 3005; // Change from 3002 to 3003
const httpPort = process.env.HTTP_PORT || 3030;

// Middleware
app.use(express.json());
app.use(cors());

// Replace the existing test route with this HTML version that includes auto-redirect

// Routes
app.use('/iot', iot);


// SSL Configuration
const { options, useHttps } = configureSSL();

// Start server
if (useHttps) {
    https.createServer(options, app).listen(port, "0.0.0.0", () => {
        console.log(`🔒 Server HTTPS chạy tại: https://192.168.0.252:${port}`);
    });

    try {
        http.createServer((req, res) => {
            res.writeHead(301, { "Location": `https://${req.headers.host}${req.url}` });
            res.end();
        }).listen(httpPort, () => {
            console.log(`🌍 HTTP Server chạy trên cổng ${httpPort} và tự động chuyển sang HTTPS`);
        });
    } catch (error) {
        console.error("❌ Không thể khởi động HTTP server:", error.message);
    }
} else {
    app.listen(port, () => {
        console.log(`Server đang chạy tại http://localhost:${port}`);
    });
}