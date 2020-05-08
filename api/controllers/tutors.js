const mongoose = require('mongoose')
const Subject = require('../models/subject')
const Tutor = require('../models/tutor')

exports.tutors_get_all = (req, res, next) => {
    Tutor.find()
        .select('subject name _id')
        .populate('subject','name')
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
}

exports.tutors_post_one = (req, res, next) => {
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
}

exports.tutors_get_one = (req, res, next) => {
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
}

exports.tutors_patch_one = (req, res, next) => {
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
}

exports.tutors_delete_one = (req, res, next) => {
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
}