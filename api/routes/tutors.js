const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Tutor = require('../models/tutor')

router.get('/', (req, res, next) => {
    Tutor.find()
        .exec()
        .then( docs => {
            console.log(docs);
            res.status(200).json(docs)  
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.post('/', (req, res, next) => {
    const tutor = new Tutor({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    })
    tutor
        .save()
        .then( result => {
            console.log(result);
            res.status(201).json({
                message:'Handling POST requests to /tutors',
                createdTutor: result
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
            console.log('From the database', doc);
            if(doc) {
                res.status(200).json(doc)
            }else{
                res.status(404).json({
                    message:'No valid entry found for provided ID'
                })
            }
           
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
            res.status(200).json(result)
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router;