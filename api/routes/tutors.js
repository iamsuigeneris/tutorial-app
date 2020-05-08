const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const checkAuth = require('../middleware/check-auth'); 

const Tutor = require('../models/tutor')
const Subject = require('../models/subject')

const TutorsController = require('../controllers/tutor')

router.get('/', TutorsController.tutors_get_all)

router.post('/', checkAuth, TutorsController.tutors_post_one)

router.get('/:tutorId' , TutorsController.tutors_get_one)

router.patch('/:tutorId' , checkAuth, TutorsController.tutors_patch_one)

router.delete('/:tutorId', checkAuth, TutorsController.tutors_delete_one)

module.exports = router;