'use strict';

//* LIB
const express = require('express');
const router = express.Router();

//* IMPORT
const { asyncHandler } = require('../../../../common/helpers/asyncHandler');
const CarControllers = require('../../controllers/car.controller');

// Todo 1. Search much
router.get('/search', asyncHandler(CarControllers.searchAll));

// Todo 1. Search much index not follow
router.post('/search/idx', asyncHandler(CarControllers.searchAllIndex));

// Todo 2. Get detail
router.get('/:id', asyncHandler(CarControllers.getDetailId));

// Todo 3. Create
router.post('/create', asyncHandler(CarControllers.create));

// Todo 4. Update
router.patch('/update', asyncHandler(CarControllers.update));

// Todo 5. Delete
router.delete('/delete/:id', asyncHandler(CarControllers.delete));

// Todo 6. Set Expire
router.get('/expire/:id', asyncHandler(CarControllers.expired));

module.exports = router;
