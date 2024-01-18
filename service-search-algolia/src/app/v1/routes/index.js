'use strict';

//* LIB
const express = require('express');

//* IMPORT
const { StatusCodes, ReasonPhrases } = require('../../../common/utils/httpStatusCode');

const router = express.Router();

// Todo: 1. Cars
router.use('/v1/cars', require('./cars'));

router.get('/v1', async (_, res, __) => {
    const healthCheck = {
        uptime: process.uptime(),
        message: ReasonPhrases.OK,
        timestamp: Date.now(),
    };
    return res.status(StatusCodes.OK).json(healthCheck);
});

module.exports = router;
