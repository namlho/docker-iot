import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all iot_environment_status records
export const getAllIotEnv = async (req, res) => {
    try {
        // Get all columns from the schema
        const iotEnvData = await prisma.$queryRaw`
            SELECT 
                id,
                leak_current_ma,
                temperature_c,
                humidity_percent,
                leak_status,
                over_temperature,
                over_humidity,
                timestamp,
                to_char(timestamp, 'YYYY-MM-DD HH24:MI:SS') as formatted_time
            FROM iot_environment_status
            ORDER BY id DESC
        `;

        return res.status(200).json({
            success: true,
            data: iotEnvData,
            message: 'Successfully retrieved all IoT environment data'
        });
    } catch (error) {
        console.error('Error fetching IoT environment data:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve IoT environment data',
            error: error.message
        });
    }
};

// Get the latest iot_environment_status record
export const getLatestIotEnv = async (req, res) => {
    try {
        const latestIotEnv = await prisma.$queryRaw`
            SELECT 
                id,
                leak_current_ma,
                temperature_c,
                humidity_percent,
                leak_status,
                over_temperature,
                over_humidity,
                to_char(timestamp, 'YYYY-MM-DD HH24:MI:SS') as formatted_time
            FROM iot_environment_status
            ORDER BY id DESC
            LIMIT 1
        `;

        if (!latestIotEnv || latestIotEnv.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No IoT environment records found'
            });
        }

        return res.status(200).json({
            success: true,
            data: latestIotEnv[0],
            message: 'Successfully retrieved latest IoT environment data'
        });
    } catch (error) {
        console.error('Error fetching latest IoT environment data:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve latest IoT environment data',
            error: error.message
        });
    }
};

// Add a new iot_environment_status record
export const addIotEnv = async (req, res) => {
    try {
        const {
            leak_current_ma,
            temperature_c,
            humidity_percent,
            leak_status,
            over_temperature,
            over_humidity
        } = req.body;

        // Validate required fields
        if (leak_current_ma === undefined || temperature_c === undefined || humidity_percent === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Insert new record using queryRaw to get the returned ID
        const result = await prisma.$queryRaw`
            INSERT INTO iot_environment_status (
                leak_current_ma,
                temperature_c,
                humidity_percent,
                leak_status,
                over_temperature,
                over_humidity,
                timestamp
            ) VALUES (
                ${leak_current_ma}::real,
                ${temperature_c}::real,
                ${humidity_percent}::real,
                ${leak_status || false},
                ${over_temperature || false},
                ${over_humidity || false},
                CURRENT_TIMESTAMP
            ) RETURNING id
        `;

        return res.status(201).json({
            success: true,
            message: 'IoT environment data added successfully',
            data: { id: result[0].id }
        });
    } catch (error) {
        console.error('Error adding IoT environment data:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to add IoT environment data',
            error: error.message
        });
    }
};