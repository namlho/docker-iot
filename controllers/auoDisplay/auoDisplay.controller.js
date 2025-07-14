import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all auo_display records
export const getAllAuoDisplay = async (req, res) => {
    try {
        // Get all columns from the schema
        const auoDisplayData = await prisma.$queryRaw`
            SELECT 
                id,
                voltage,
                current,
                power_operating,
                frequency,
                power_factor,
                CAST(operating_time AS TEXT) as operating_time,
                over_voltage_operating,
                over_current_operating,
                over_power_operating,
                status_operating,
                under_voltage_operating,
                power_socket_status,
                timestamp,
                to_char(timestamp, 'YYYY-MM-DD HH24:MI:SS') as formatted_time

            FROM auo_display a
            ORDER BY id DESC
        `;

        return res.status(200).json({
            success: true,
            data: auoDisplayData,
            message: 'Successfully retrieved all AUO display data'
        });
    } catch (error) {
        console.error('Error fetching AUO display data:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve AUO display data',
            error: error.message
        });
    }
};

// Get the latest auo_display record
export const getLatestAuoDisplay = async (req, res) => {
    try {
        // List all fields explicitly
        const latestAuoDisplay = await prisma.$queryRaw`
            SELECT 
                id,
                voltage,
                current,
                power_operating,
                frequency,
                power_factor,
                CAST(operating_time AS TEXT) as operating_time,
                over_voltage_operating,
                over_current_operating,
                over_power_operating,
                status_operating,
                under_voltage_operating,
                power_socket_status,
                timestamp,
                to_char(timestamp, 'YYYY-MM-DD HH24:MI:SS') as formatted_time

            FROM auo_display a
            ORDER BY id DESC
            LIMIT 1
        `;

        if (!latestAuoDisplay || latestAuoDisplay.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No AUO display records found'
            });
        }

        return res.status(200).json({
            success: true,
            data: latestAuoDisplay[0],
            message: 'Successfully retrieved latest AUO display data'
        });
    } catch (error) {
        console.error('Error fetching latest AUO display data:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve latest AUO display data',
            error: error.message
        });
    }
};

// Updated addAuoDisplay function with timestamp
export const addAuoDisplay = async (req, res) => {
    try {
        const {
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
            power_socket_status
        } = req.body;

        // Validate required fields
        if (voltage === undefined || current === undefined || power_operating === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Insert new record using queryRaw to get the returned ID
        const result = await prisma.$queryRaw`
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
                timestamp,
                to_char(timestamp, 'YYYY-MM-DD HH24:MI:SS') as formatted_time

            ) VALUES (
                ${voltage}::real, 
                ${current}::real, 
                ${power_operating}::real, 
                ${frequency}::real, 
                ${power_factor}::real, 
                ${operating_time || '0 seconds'}::interval,
                ${over_voltage_operating || false},
                ${over_current_operating || false},
                ${over_power_operating || false},
                ${status_operating || false},
                ${under_voltage_operating || false},
                ${power_socket_status || false},
                CURRENT_TIMESTAMP
            ) RETURNING id
        `;

        return res.status(201).json({
            success: true,
            message: 'AUO display data added successfully',
            data: { id: result[0].id }
        });
    } catch (error) {
        console.error('Error adding AUO display data:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to add AUO display data',
            error: error.message
        });
    }
};