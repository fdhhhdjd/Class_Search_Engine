//* LIB
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');

const app = express();
require('dotenv').config();

//* IMPORT
const {
    app: { morgan: morganConfig, node },
} = require('./common/configs/app.config');
const {
    cache: { redisMaster },
} = require('./common/configs/redis.config');
const { NODE_ENV, LIMIT } = require('./common/constants');
const { StatusCodes, ReasonPhrases } = require('./common/utils/httpStatusCode');
const redisConnection = require('./dbs');
const RateLimitIp = require('./middlewares/rateLimitMiddleware');

app.use(morgan(morganConfig));
app.enable();
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(
    express.json({
        limit: LIMIT._5_MB,
    }),
);
app.use(RateLimitIp);
app.use(
    express.urlencoded({
        extended: true,
    }),
);

const initializeRedis = async () => {
    try {
        await redisConnection.createConnection(`${redisMaster.protocol}://${redisMaster.host}:${redisMaster.port}`);
    } catch (error) {
        console.error('Error connecting to Redis:', error);
    }
};

initializeRedis();

//* V1
app.use('/api', require('./app/v1/routes'));

//* Error
app.use((_, __, next) => {
    const ErrorCode = new Error(StatusCodes.NOT_FOUND);
    ErrorCode.status = StatusCodes.NOT_FOUND;
    return next(ErrorCode);
});

app.use((error, _, res, __) => {
    const statusCode = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || ReasonPhrases.INTERNAL_SERVER_ERROR;

    const response = {
        message,
        status: statusCode,
    };

    const checkNodeApp = node === NODE_ENV.DEV;
    if (checkNodeApp) {
        Object.assign(response, { stack: error.stack });
    }

    return res.status(statusCode).json(response);
});

module.exports = app;
