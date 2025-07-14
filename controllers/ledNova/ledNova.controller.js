import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all led_nova_100 records
export const getAllLedNova = async (req, res) => {
    try {
        const ledNovaData = await prisma.$queryRaw`
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
            FROM led_nova_100
            ORDER BY id DESC
        `;

        return res.status(200).json({
            success: true,
            data: ledNovaData,
            message: 'Successfully retrieved all LED Nova data'
        });
    } catch (error) {
        console.error('Error fetching LED Nova data:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve LED Nova data',
            error: error.message
        });
    }
};

// Get the latest led_nova_100 record
export const getLatestLedNova = async (req, res) => {
    try {
        const latestLedNova = await prisma.$queryRaw`
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
            FROM led_nova_100
            ORDER BY id DESC
            LIMIT 1
        `;

        if (!latestLedNova || latestLedNova.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No LED Nova records found'
            });
        }

        return res.status(200).json({
            success: true,
            data: latestLedNova[0],
            message: 'Successfully retrieved latest LED Nova data'
        });
    } catch (error) {
        console.error('Error fetching latest LED Nova data:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve latest LED Nova data',
            error: error.message
        });
    }
};

// Fix addLedNova function (add return statement)
export const addLedNova = async (req, res) => {
    try {
        // Rest of function remains the same...

        return res.status(201).json({
            success: true,
            message: 'LED Nova data added successfully',
            data: { id: result[0].id }
        });
    } catch (error) {
        console.error('Error adding LED Nova data:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to add LED Nova data',
            error: error.message
        });
    }
};