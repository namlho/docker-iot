import express from 'express';

import {
    getAllAuoDisplay,
    getLatestAuoDisplay,
    addAuoDisplay
} from '../controllers/auoDisplay/auoDisplay.controller.js';

import {
    getAllCameraControl,
    getLatestCameraControl,
    addCameraControl
} from '../controllers/cameraControl/cameraControl.controller.js';

import {
    getAllElectronic,
    getLatestElectronic,
    addElectronic
} from '../controllers/electronic/electronic.controller.js';

import {
    getAllLedNova,
    getLatestLedNova,
    addLedNova
} from '../controllers/ledNova/ledNova.controller.js';

import {
    getAllIotEnv,
    getLatestIotEnv,
    addIotEnv
} from '../controllers/iotEnv/iotEnv.controller.js';
// Add this import at the top with the other imports

const router = express.Router();

// AUO Display routes
router.get('/auo-display', getAllAuoDisplay);
router.get('/auo-display/latest', getLatestAuoDisplay);
router.post('/auo-display', addAuoDisplay);

// Camera Control Unit routes
router.get('/camera-control', getAllCameraControl);
router.get('/camera-control/latest', getLatestCameraControl);
router.post('/camera-control', addCameraControl);

// Electronic Endoflator routes
router.get('/electronic', getAllElectronic);
router.get('/electronic/latest', getLatestElectronic);
router.post('/electronic', addElectronic);

// LED Nova 100 routes
router.get('/led-nova', getAllLedNova);
router.get('/led-nova/latest', getLatestLedNova);
router.post('/led-nova', addLedNova);

// IoT Environment Status routes
router.get('/iot-env', getAllIotEnv);
router.get('/iot-env/latest', getLatestIotEnv);
router.post('/iot-env', addIotEnv);
export default router;