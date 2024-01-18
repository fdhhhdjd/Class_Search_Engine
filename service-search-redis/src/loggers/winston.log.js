'use strict';

//* LIB
const path = require('path');
const winston = require('winston');

const { combine, timestamp, align, printf } = winston.format;
const logsDirectory = path.join(__dirname, '../logs'); // Use an absolute path

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'debug',
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`),
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ dirname: logsDirectory, filename: 'test.log' }),
    ],
});

module.exports = logger;
