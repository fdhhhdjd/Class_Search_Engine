'use strict';

//* LIB
const express = require('express');
const router = express.Router();

//* IMPORT
const { asyncHandler } = require('../../../../common/helpers/asyncHandler');
const CarControllers = require('../../controllers/car.controller');

// Todo 1. Search much
router.get('/search', asyncHandler(CarControllers.searchAll));

// Todo 2. Get all
router.get('/get/all', asyncHandler(CarControllers.getAllCars));

// Todo 3. Search much index not follow
router.post('/search/idx', asyncHandler(CarControllers.searchAllIndex));

// Todo 4. Get detail
router.get('/:id', asyncHandler(CarControllers.getDetailId));

// Todo 5. Create
router.post('/create', asyncHandler(CarControllers.create));

// Todo 6. Update
router.patch('/update', asyncHandler(CarControllers.update));

// Todo 7. Delete
router.delete('/delete/:id', asyncHandler(CarControllers.delete));

// Todo 8. Set Expire
router.get('/expire/:id', asyncHandler(CarControllers.expired));

module.exports = router;
