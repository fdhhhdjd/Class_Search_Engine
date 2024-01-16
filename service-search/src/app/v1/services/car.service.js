/* eslint-disable security/detect-object-injection */
'use strict';

const { EntityId } = require('redis-om');

//* IMPORT
const { BadRequestRequestError } = require('../../../cores/error.response');
const redisClient = require('../../../dbs/client');
const carRepository = require('../models/schemas/car.schema');

class CarService {
    static async searchAll({ query }) {
        // Search follow make and model
        const searchQuery = carRepository
            .search()
            .where('make')
            .equals(`*${query}*`)
            .or((search) => search.where('model').equals(`*${query}*`));

        const count = await searchQuery.count();

        const car = await searchQuery.return.all();

        return { count, car };
    }

    static async searchAllIndex({ idx, query }) {
        if (!idx || !query) throw new BadRequestRequestError();

        const searchResults = await redisClient.search(idx, `%${query}%`);

        return searchResults;
    }

    static async getDetailId({ id }) {
        const car = await carRepository.fetch(id);
        return car;
    }

    static async create({ make, model, image, description }) {
        await carRepository.createIndex();

        const car = await carRepository.save({ make, model, image, description });

        Object.assign(car, { id: car?.[EntityId] });

        await carRepository.save(car);

        return car;
    }

    static async update({ id, make, model, image, description }) {
        const car = await carRepository.fetch(id);

        Object.assign(car, { id, make, model, image, description });

        await carRepository.save(car);

        return car;
    }

    static async delete({ id }) {
        const hadRemoveIndex = await carRepository.remove(id);

        return hadRemoveIndex;
    }

    static async expired({ id }) {
        const ttlInSeconds = 12 * 60 * 60; // 12 hours

        carRepository.expire(id, ttlInSeconds);
        return 'Ok';
    }
}

module.exports = CarService;
