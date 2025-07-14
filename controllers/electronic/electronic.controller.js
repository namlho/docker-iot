import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// For getAllElectronic
export const getAllElectronic = async (req, res) => {
    try {
        const electronicData = await prisma.$queryRaw`
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
            FROM electronic_endoflator
            ORDER BY id DESC
        `;

        return res.status(200).json({
            success: true,
            data: electronicData,
            message: 'Successfully retrieved all electronic endoflator data'
        });
    } catch (error) {
        console.error('Error fetching electronic endoflator data:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve electronic endoflator data',
            error: error.message
        });
    }
};

// For getLatestElectronic
export const getLatestElectronic = async (req, res) => {
    try {
        const latestElectronic = await prisma.$queryRaw`
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

            FROM electronic_endoflator
            ORDER BY id DESC
            LIMIT 1
        `;

        if (!latestElectronic || latestElectronic.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No Electronic Endoflator records found'
            });
        }

        return res.status(200).json({
            success: true,
            data: latestElectronic[0],
            message: 'Successfully retrieved latest Electronic Endoflator data'
        });
    } catch (error) {
        console.error('Error fetching latest Electronic Endoflator data:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve latest Electronic Endoflator data',
            error: error.message
        });
    }
};

// Complete addElectronic function with timestamp
export const addElectronic = async (req, res) => {
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

        // Insert new record using queryRaw to get the returned ID
        const result = await prisma.$queryRaw`
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
            message: 'Electronic Endoflator data added successfully',
            data: { id: result[0].id }
        });
    } catch (error) {
        console.error('Error adding Electronic Endoflator data:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to add Electronic Endoflator data',
            error: error.message
        });
    }
};