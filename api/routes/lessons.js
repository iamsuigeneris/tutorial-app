const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const checkAuth = require('../middleware/check-auth'); 

const Lesson = require('../models/lesson')
const Subject = require('../models/subject')

const LessonsController = require('../controllers/lessons')

router.get('/', LessonsController.lessons_get_all)

router.post('/', checkAuth, LessonsController.lessons_post_one)

router.get('/:lessonId' , LessonsController.lessons_get_one)

router.patch('/:lessonId', checkAuth, LessonsController.lessons_patch_one)

router.delete('/:lessonId', checkAuth,)

module.exports = router;