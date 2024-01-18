'use strict';

//* IMPORT
const { SuccessResponse } = require('../../../cores/success.response');
const MovieService = require('../services/movie.service');

class MovieControllers {
    async searchMovieAllIndex(req, res, __) {
        const { idx, query } = req.query;

        new SuccessResponse({
            message: `Query ${idx} success.`,
            metadata: await MovieService.searchMovieAllIndex({ idx, query }),
        }).send(res);
    }

    async searchActorAllIndex(req, res, __) {
        const { idx, query } = req.params;

        new SuccessResponse({
            message: `Query ${idx} success.`,
            metadata: await MovieService.searchActorAllIndex({ idx, query }),
        }).send(res);
    }
}

module.exports = new MovieControllers();
