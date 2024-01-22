'use strict';

//* LIB
const express = require('express');
const router = express.Router();

//* IMPORT
const { asyncHandler } = require('../../../../common/helpers/asyncHandler');
const CarControllers = require('../../controllers/car.controller');

// -- CURD
// Todo 1. Get All
router.get('/get/all', asyncHandler(CarControllers.getAllCars));

// Todo 2. Get Detail
router.get('/get/:id', asyncHandler(CarControllers.getDetailId));

// Todo 3. Create
router.post('/create', asyncHandler(CarControllers.create));

// Todo 4. Update
router.patch('/update', asyncHandler(CarControllers.update));

// Todo 5. Delete
router.delete('/delete/:id', asyncHandler(CarControllers.delete));

// -- SEARCH
router.get('/search/all', asyncHandler(CarControllers.searchAll));

module.exports = router;
