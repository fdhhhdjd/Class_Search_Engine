'use strict';

//* IMPORT
const { BadRequestRequestError } = require('../../../cores/error.response');
const redisClient = require('../../../dbs/client');

class MovieService {
    static async searchMovieAllIndex({ idx, query }) { 
        if (!idx || !query) throw new BadRequestRequestError();

        const formattedQuery = `%${query}%`;
        const formattedIndex = `${idx}`;

        const searchResults = await redisClient.search(formattedIndex, `@title:${formattedQuery}`);

        return searchResults;
    }

    static async searchActorAllIndex({ idx, query }) {
        if (!idx || !query) throw new BadRequestRequestError();

        const searchResults = await redisClient.search(idx, `%${query}%`);

        return searchResults;
    }
}

module.exports = MovieService;
