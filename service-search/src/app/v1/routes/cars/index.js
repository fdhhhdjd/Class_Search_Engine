'use strict';

//* LIB
const express = require('express');
const router = express.Router();

//* IMPORT
const { asyncHandler } = require('../../../../common/helpers/asyncHandler');
const CarControllers = require('../../controllers/car.controller');

// Todo 1. Search much
router.get('/search', asyncHandler(CarControllers.searchAll));

// Todo 2. Search much index not follow
router.post('/search/idx', asyncHandler(CarControllers.searchAllIndex));

// Todo 3. Get detail
router.get('/:id', asyncHandler(CarControllers.getDetailId));

// Todo 4. Create
router.post('/create', asyncHandler(CarControllers.create));

// Todo 5. Update
router.patch('/update', asyncHandler(CarControllers.update));

// Todo 6. Delete
router.delete('/delete/:id', asyncHandler(CarControllers.delete));

// Todo 7. Set Expire
router.get('/expire/:id', asyncHandler(CarControllers.expired));

module.exports = router;
