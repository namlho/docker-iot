import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// For getAllCameraControl
export const getAllCameraControl = async (req, res) => {
    try {
        const cameraControlData = await prisma.$queryRaw`
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
                timestamp
            FROM camera_control_unit
            ORDER BY id DESC
        `;

        return res.status(200).json({
            success: true,
            data: cameraControlData,
            message: 'Successfully retrieved all camera control unit data'
        });
    } catch (error) {
        console.error('Error fetching camera control unit data:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve camera control unit data',
            error: error.message
        });
    }
};

// For getLatestCameraControl
export const getLatestCameraControl = async (req, res) => {
    try {
        const latestCameraControl = await prisma.$queryRaw`
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
            FROM camera_control_unit
            ORDER BY id DESC
            LIMIT 1
        `;

        if (!latestCameraControl || latestCameraControl.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No Camera Control Unit records found'
            });
        }

        return res.status(200).json({
            success: true,
            data: latestCameraControl[0],
            message: 'Successfully retrieved latest Camera Control Unit data'
        });
    } catch (error) {
        console.error('Error fetching latest Camera Control Unit data:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve latest Camera Control Unit data',
            error: error.message
        });
    }
};

// Updated addCameraControl function with timestamp
export const addCameraControl = async (req, res) => {
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
            message: 'Camera Control Unit data added successfully',
            data: { id: result[0].id }
        });
    } catch (error) {
        console.error('Error adding Camera Control Unit data:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to add Camera Control Unit data',
            error: error.message
        });
    }
};