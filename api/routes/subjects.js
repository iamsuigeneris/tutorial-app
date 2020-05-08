const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const checkAuth = require('../middleware/check-auth'); 

const Subject = require('../models/subject')
const Category = require('../models/category')

const SubjectsController = require('../controllers/subject')

router.get('/', SubjectsController.subjects_get_all)

router.post('/', checkAuth, SubjectsController.subjects_post_one)
    
router.get('/:subjectId' , SubjectsController.subjects_get_one)

router.patch('/:subjectd', checkAuth, SubjectsController.subjects_patch_one)

router.delete('/:subjectId', checkAuth, SubjectsController.subjects_delete_one)

module.exports = router;