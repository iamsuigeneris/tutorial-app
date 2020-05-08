const mongoose = require('mongoose');

const Subject = require('../models/subject')
const Category = require('../models/category')

exports.subjects_get_all = (req, res, next) => {
    Subject.find()
    .select('category name _id')
    .populate('category','name')
    .exec()
    .then( docs => {
        res.status(200).json({
            count: docs.length,
            subjects: docs.map( doc => {
                return {
                    _id: doc._id,
                    category: doc.category,
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

exports.subjects_post_one = (req, res, next) => {
    Category.findById(req.body.categoryId) 
        .then( category => {
            if(!category){
                return res.status(404).json({
                    message: "Category not found"
                })
            }
            const subject = new Subject({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                category: req.body.categoryId
            })
            return subject.save()
        })
        .then( result => {
            console.log(result);
            res.status(201).json({
                message:'Subject Stored',
                createdSubject: {
                    _id: result._id,
                    category: result.category,
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

exports.subjects_get_one = (req, res, next) => {
    const id = req.params.subjectId;
    Subject.findById(id)
        .populate('category','name')
        .exec()
        .then(subject => {
            res.status(200).json({
                subject: subject
            })
           
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
    })
}

exports.subjects_patch_one = (req, res, next) => {
    const id = req.params.subjectId;
    const updateOps = {};
    for( const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Subject.update({ _id: id }, {$set: updateOps })
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

exports.subjects_delete_one = (req, res, next) => {
    const id = req.params.subjectId;
    Subject.remove({ _id: id })
        .exec()
        .then( result => {
            res.status(200).json({
                message: 'Subject deleted'
            })
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}