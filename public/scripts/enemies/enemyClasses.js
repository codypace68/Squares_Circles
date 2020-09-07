import {Square} from './squares/square.js';
import {FastSquare} from './squares/fastSquare.js';
import {TrackingSquare} from './squares/trackingSquare.js';
import {LaserSquare} from './squares/laserSquare.js';

import {Circle} from './circles/circle.js'
import {AlternatingSizeCircle} from './circles/altSizeCircle.js';


const classList = {
    "FastSquare": FastSquare,
    "TrackingSquare": TrackingSquare,
    "LaserSquare": LaserSquare,
    "Square": Square,
    "Circle": Circle,
    "AlternatingSizeCircle": AlternatingSizeCircle
}

export {
    classList
}