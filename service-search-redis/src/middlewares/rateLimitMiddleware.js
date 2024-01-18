//* LIB
const rateLimit = require('express-rate-limit');

//* IMPORT
const { REQUEST } = require('../common/constants');
const { ReasonPhrases, StatusCodes } = require('../common/utils/httpStatusCode');

module.exports = rateLimit({
    windowMs: REQUEST._WINDOW_MS,
    max: REQUEST._MAX,
    message: {
        status: StatusCodes.TOO_MANY_REQUESTS,
        message: ReasonPhrases.TOO_MANY_REQUESTS,
    },
    standardHeaders: true,
});
