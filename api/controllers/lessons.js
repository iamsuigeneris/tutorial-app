const mongoose = require('mongoose')
const Subject = require('../models/subject')
const Lesson = require('../models/lesson')

exports.lessons_get_all = (req, res, next) => {
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
}

exports.lessons_post_one = (req, res, next) => {
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
}

exports.lessons_get_one = (req, res, next) => {
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
}

exports.lessons_patch_one = (req, res, next) => {
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
}

exports.lessons_delete_one =  (req, res, next) => {
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
}