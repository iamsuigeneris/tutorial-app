const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Tutor = require('../models/tutor')
const Subject = require('../models/subject')

router.get('/', (req, res, next) => {
    Tutor.find()
        .select('subject name _id')
        .exec()
        .then( docs => {
            res.status(200).json({
                count: docs.length,
                tutors: docs.map( doc => {
                    return {
                        _id: doc._id,
                        subject: doc.subject,
                        name: doc.name
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
            const tutor = new Tutor({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                subject: req.body.subjectId

            })
            return tutor.save()
        })
        .then( result => {
            console.log(result);
            res.status(201).json({
                message:'Tutor Stored',
                createdTutor: {
                    _id: result._id,
                    subject: result.subject,
                    name:result.name
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


router.get('/:tutorId' ,(req, res, next) => {
    const id = req.params.tutorId;
    Tutor.findById(id)
        .exec()
        .then(doc => {
            res.status(200).json({
                tutor: tutor
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
})

router.patch('/:tutorId' ,(req, res, next) => {
    const id = req.params.tutorId;
    const updateOps = {};
    for( const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Tutor.update({ _id: id }, {$set: updateOps })
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

router.delete('/:tutorId' ,(req, res, next) => {
    const id = req.params.tutorId;
    Tutor.remove({ _id: id })
        .exec()
        .then( result => {
            res.status(200).json({
                message: 'Tutor deleted'
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