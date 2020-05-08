const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Lesson = require('../models/lesson')
const Subject = require('../models/subject')

router.get('/', (req, res, next) => {
    Lesson.find()
        .select('subject title _id')
        .populate('subject','name')
        .exec()
        .then( docs => {
            res.status(200).json({
                count: docs.length,
                lessons: docs.map( doc => {
                    return {
                        _id: doc._id,
                        subject: doc.subject,
                        title: doc.title
                    }
                })
            })  
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.post('/', (req, res, next) => {
    Subject.findById(req.body.subjectId) 
        .then( subject => {
            if(!subject){
                return res.status(404).json({
                    message: "Subject not found"
                })
            }
            const lesson = new Lesson({
                _id: mongoose.Types.ObjectId(),
                title: req.body.title,
                subject: req.body.subjectId

            })
            return lesson.save()
        })
        .then( result => {
            console.log(result);
            res.status(201).json({
                message:'lesson Stored',
                createdLesson: {
                    _id: result._id,
                    subject: result.subject,
                    title: result.title
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.get('/:lessonId' ,(req, res, next) => {
    const id = req.params.lessonId;
    Lesson.findById(id)
        .populate('subject','name')
        .exec()
        .then(doc => {
            res.status(200).json({
                lesson: lesson
            })  
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
})

router.patch('/:lessonId' ,(req, res, next) => {
    const id = req.params.lessonId;
    const updateOps = {};
    for( const ops of req.body) {
        updateOps[ops.propTitle] = ops.value;
    }
    Lesson.update({ _id: id }, {$set: updateOps })
        .exec()
        .then( result => {
            console.log(result);
            res.status(200).json(result)
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.delete('/:lessonId' ,(req, res, next) => {
    const id = req.params.lessonId;
    Lesson.remove({ _id: id })
        .exec()
        .then( result => {
            res.status(200).json({
                message: 'Lesson deleted'
            })
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router;