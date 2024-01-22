'use strict';

//* IMPORT
const { SuccessResponse, Created } = require('../../../cores/success.response');
const CarService = require('../services/car.service');

class CarControllers {
    async searchAll(req, res, __) {
        const query = req.query.q;
        new SuccessResponse({
            message: 'Search All key success.',
            metadata: await CarService.searchAll({ query }),
        }).send(res);
    }

    async getAllCars(_, res, __) {
        new SuccessResponse({
            message: 'Get All Cars success.',
            metadata: await CarService.getAllCars(),
        }).send(res);
    }

    async searchAllIndex(req, res, __) {
        const { idx, query } = req.body;

        new SuccessResponse({
            message: `Query ${idx} success.`,
            metadata: await CarService.searchAllIndex({ idx, query }),
        }).send(res);
    }

    async getDetailId(req, res, __) {
        const id = req.params.id;
        new SuccessResponse({
            message: 'Get detail todo success.',
            metadata: await CarService.getDetailId({ id }),
        }).send(res);
    }

    async create(req, res, __) {
        new Created({
            message: 'Create todo success.',
            metadata: await CarService.create(req.body),
        }).send(res);
    }

    async update(req, res, __) {
        new SuccessResponse({
            message: 'Update todo success',
            metadata: await CarService.update(req.body),
        }).send(res);
    }

    async delete(req, res, __) {
        const id = req.params.id;

        new SuccessResponse({
            message: 'Delete todo success.',
            metadata: await CarService.delete({ id }),
        }).send(res);
    }
}

module.exports = new CarControllers();
