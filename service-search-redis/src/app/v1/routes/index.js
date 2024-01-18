'use strict';

//* LIB
const express = require('express');

//* IMPORT
const { Car } = require('../../../common/cache/cart');
const { StatusCodes, ReasonPhrases } = require('../../../common/utils/httpStatusCode');
const redisClient = require('../../../dbs/client');

const router = express.Router();

// Todo: 1. Cars
router.use('/v1/cars', require('./cars'));

// Todo: 2 Movie
router.use('/v1/movies', require('./movies'));

router.get('/v1', async (_, res, __) => {
    const dataTestRedis = await redisClient.get(Car);
    const healthCheck = {
        uptime: process.uptime(),
        message: dataTestRedis || ReasonPhrases.OK,
        timestamp: Date.now(),
    };
    return res.status(StatusCodes.OK).json(healthCheck);
});

module.exports = router;
