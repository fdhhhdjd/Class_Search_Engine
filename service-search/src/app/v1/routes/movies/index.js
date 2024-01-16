'use strict';

//* LIB
const express = require('express');
const router = express.Router();

//* IMPORT
const { asyncHandler } = require('../../../../common/helpers/asyncHandler');
const MovieControllers = require('../../controllers/movie.controller');

// Todo 1. Search much index movie
router.get('/search/idx', asyncHandler(MovieControllers.searchMovieAllIndex));

// Todo 2. Search much index actor
router.get('/search/actor/idx', asyncHandler(MovieControllers.searchActorAllIndex));

module.exports = router;
