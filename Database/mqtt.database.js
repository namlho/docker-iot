import mqtt from 'mqtt';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

// Use environment variables instead of hardcoded values
const mqttConfig = {
    host: process.env.MQTT_HOST || 'broker.hivemq.com',
    port: parseInt(process.env.MQTT_PORT || '1883'),
    clientId: `iot-server-${Math.random().toString(16).slice(2, 8)}`,
    username: process.env.MQTT_USERNAME || '',
    password: process.env.MQTT_PASSWORD || '',
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
};

console.log(`Connecting to MQTT broker at ${mqttConfig.host}:${mqttConfig.port}`);
const url = `mqtt://${mqttConfig.host}:${mqttConfig.port}`;

// Connect to MQTT broker
const client = mqtt.connect(url, mqttConfig);

// Define topics to subscribe to
const topics = {
    auoDisplay: 'iot/auo-display',
    cameraControl: 'iot/camera-control',
    electronic: 'iot/electronic',
    ledNova: 'iot/led-nova',
    iotEnv: 'iot/environment'
};

// Connect event
client.on('connect', () => {
    console.log(`MQTT client connected to ${mqttConfig.host}:${mqttConfig.port}`);

    // Subscribe to all topics
    Object.values(topics).forEach(topic => {
        client.subscribe(topic, (err) => {
            if (!err) {
                console.log(`Subscribed to ${topic}`);
            } else {
                console.error(`Error subscribing to ${topic}:`, err);
            }
        });
    });
});

// Message handler
client.on('message', async (topic, message) => {
    try {
        console.log(`Received message on ${topic}: ${message.toString()}`);
        const data = JSON.parse(message.toString());

        // Process based on topic
        switch (topic) {
            case topics.auoDisplay:
                await processAuoDisplayData(data);
                break;
            case topics.cameraControl:
                await processCameraControlData(data);
                break;
            case topics.electronic:
                await processElectronicData(data);
                break;
            case topics.ledNova:
                await processLedNovaData(data);
                break;
            case topics.iotEnv:
                await processIotEnvData(data);
                break;
            default:
                console.log(`No handler for topic ${topic}`);
        }
    } catch (error) {
        console.error('Error processing MQTT message:', error);
    }
});

// Process AUO Display data
async function processAuoDisplayData(data) {
    try {
        await prisma.$queryRaw`
            INSERT INTO auo_display (
                voltage, 
                current, 
                power_operating, 
                frequency, 
                power_factor, 
                operating_time,
                over_voltage_operating,
                over_current_operating,
                over_power_operating,
                status_operating,
                under_voltage_operating,
                power_socket_status,
                timestamp
            ) VALUES (
                ${data.voltage || 0}::real, 
                ${data.current || 0}::real, 
                ${data.power_operating || 0}::real, 
                ${data.frequency || 0}::real, 
                ${data.power_factor || 0}::real, 
                ${data.operating_time || '0 seconds'}::interval,
                ${data.over_voltage_operating || false},
                ${data.over_current_operating || false},
                ${data.over_power_operating || false},
                ${data.status_operating || false},
                ${data.under_voltage_operating || false},
                ${data.power_socket_status || false},
                CURRENT_TIMESTAMP
            )
        `;
        console.log('AUO Display data saved successfully');
    } catch (error) {
        console.error('Error saving AUO Display data:', error);
    }
}

// Process Camera Control Unit data
async function processCameraControlData(data) {
    try {
        await prisma.$queryRaw`
            INSERT INTO camera_control_unit (
                voltage, 
                current, 
                power_operating, 
                frequency, 
                power_factor, 
                operating_time,
                over_voltage_operating,
                over_current_operating,
                over_power_operating,
                status_operating,
                under_voltage_operating,
                power_socket_status,
                timestamp
            ) VALUES (
                ${data.voltage || 0}::real, 
                ${data.current || 0}::real, 
                ${data.power_operating || 0}::real, 
                ${data.frequency || 0}::real, 
                ${data.power_factor || 0}::real, 
                ${data.operating_time || '0 seconds'}::interval,
                ${data.over_voltage_operating || false},
                ${data.over_current_operating || false},
                ${data.over_power_operating || false},
                ${data.status_operating || false},
                ${data.under_voltage_operating || false},
                ${data.power_socket_status || false},
                CURRENT_TIMESTAMP
            )
        `;
        console.log('Camera Control Unit data saved successfully');
    } catch (error) {
        console.error('Error saving Camera Control Unit data:', error);
    }
}

// Process Electronic Endoflator data
async function processElectronicData(data) {
    try {
        await prisma.$queryRaw`
            INSERT INTO electronic_endoflator (
                voltage, 
                current, 
                power_operating, 
                frequency, 
                power_factor, 
                operating_time,
                over_voltage_operating,
                over_current_operating,
                over_power_operating,
                status_operating,
                under_voltage_operating,
                power_socket_status,
                timestamp
            ) VALUES (
                ${data.voltage || 0}::real, 
                ${data.current || 0}::real, 
                ${data.power_operating || 0}::real, 
                ${data.frequency || 0}::real, 
                ${data.power_factor || 0}::real, 
                ${data.operating_time || '0 seconds'}::interval,
                ${data.over_voltage_operating || false},
                ${data.over_current_operating || false},
                ${data.over_power_operating || false},
                ${data.status_operating || false},
                ${data.under_voltage_operating || false},
                ${data.power_socket_status || false},
                CURRENT_TIMESTAMP
            )
        `;
        console.log('Electronic Endoflator data saved successfully');
    } catch (error) {
        console.error('Error saving Electronic Endoflator data:', error);
    }
}

// Process LED Nova data
async function processLedNovaData(data) {
    try {
        await prisma.$queryRaw`
            INSERT INTO led_nova_100 (
                voltage, 
                current, 
                power_operating, 
                frequency, 
                power_factor, 
                operating_time,
                over_voltage_operating,
                over_current_operating,
                over_power_operating,
                status_operating,
                under_voltage_operating,
                power_socket_status,
                timestamp
            ) VALUES (
                ${data.voltage || 0}::real, 
                ${data.current || 0}::real, 
                ${data.power_operating || 0}::real, 
                ${data.frequency || 0}::real, 
                ${data.power_factor || 0}::real, 
                ${data.operating_time || '0 seconds'}::interval,
                ${data.over_voltage_operating || false},
                ${data.over_current_operating || false},
                ${data.over_power_operating || false},
                ${data.status_operating || false},
                ${data.under_voltage_operating || false},
                ${data.power_socket_status || false},
                CURRENT_TIMESTAMP
            )
        `;
        console.log('LED Nova data saved successfully');
    } catch (error) {
        console.error('Error saving LED Nova data:', error);
    }
}

// Process IoT Environment data
async function processIotEnvData(data) {
    try {
        await prisma.$queryRaw`
            INSERT INTO iot_environment_status (
                leak_current_ma,
                temperature_c,
                humidity_percent,
                leak_status,
                over_temperature,
                over_humidity,
                timestamp
            ) VALUES (
                ${data.leak_current_ma || 0}::real,
                ${data.temperature_c || 0}::real,
                ${data.humidity_percent || 0}::real,
                ${data.leak_status || false},
                ${data.over_temperature || false},
                ${data.over_humidity || false},
                CURRENT_TIMESTAMP
            )
        `;
        console.log('IoT Environment data saved successfully');
    } catch (error) {
        console.error('Error saving IoT Environment data:', error);
    }
}

// Error handler
client.on('error', (error) => {
    console.error('MQTT client error:', error);
});

// Reconnect handler
client.on('reconnect', () => {
    console.log('MQTT client reconnecting...');
});

// Close handler
client.on('close', () => {
    console.log('MQTT client connection closed');
});

// Export the client for use in other modules
export default client;