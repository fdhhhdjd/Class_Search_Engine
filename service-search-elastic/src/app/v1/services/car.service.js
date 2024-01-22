/* eslint-disable no-useless-catch */
'use strict';

const { NameIndex } = require('../../../common/index/cars');
const client = require('../../../dbs');

//* IMPORT

class CarService {
    static async searchAll({ query }) {
        const result = await client.search({
            index: NameIndex,
            body: {
                query: {
                    multi_match: {
                        query: query,
                        fields: ['make', 'model'],
                    },
                },
            },
        });

        return result.hits;
    }

    static async getAllCars() {
        try {
            const result = await client.search({
                index: NameIndex,
                body: {
                    query: { match_all: {} },
                },
            });

            // const data = result.hits.hits.map((hit) => hit._source);
            return result.hits;
        } catch (error) {
            throw error;
        }
    }

    static async getDetailId({ id }) {
        try {
            const result = await client.get({
                index: NameIndex,
                id: id,
            });

            return result;
        } catch (error) {
            throw error;
        }
    }

    static async create({ make, model, image, description }) {
        try {
            const result = await client.index({
                index: NameIndex,
                body: {
                    make: make,
                    model: model,
                    image: image,
                    description: description,
                },
            });

            return result;
        } catch (error) {
            throw error;
        }
    }

    static async update({ id, make, model, image, description }) {
        try {
            const result = await client.update({
                index: NameIndex,
                id: id,
                body: {
                    doc: {
                        make: make,
                        model: model,
                        image: image,
                        description: description,
                    },
                },
            });

            return result;
        } catch (error) {
            throw error;
        }
    }

    static async delete({ id }) {
        try {
            const result = await client.delete({
                index: NameIndex,
                id: id,
            });

            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CarService;
