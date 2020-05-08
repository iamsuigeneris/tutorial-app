const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const checkAuth = require('../middleware/check-auth'); 

const Category = require('../models/category')
const CategoriesController = require('../controllers/categories')

router.get('/', CategoriesController.categories_get_all)

router.post('/', checkAuth, CategoriesController.categories_post_one)

router.get('/:categoryId', CategoriesController.categories_get_one)

router.patch('/:categoryId', checkAuth, CategoriesController.categories_patch_one)

router.delete('/:categoryId', checkAuth, CategoriesController.categories_delete_one)

module.exports = router;