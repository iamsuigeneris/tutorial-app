const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Subject = require('../models/subject')
const Category = require('../models/category')

// router.get('/', (req, res, next) => {
//     Subject.find()
//     .select('category name _id')
//         .exec()
//         .then( docs => {
//             res.status(200).json({
//                 count: docs.length,
//                 subjects: docs.map( doc => {
//                     return {
//                         _id: doc._id,
//                         category: doc.category,
//                         name: doc.name
//                     }
//                 })  
//             })   
//         })
//         .catch( err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })
//         })
// })

// router.post('/', (req, res, next) => {
//     Category.findById(req.body.categoryId) 
//         .then( category => {
//             if(!category){
//                 return res.status(404).json({
//                     message: "Category not found"
//                 })
//             }
//             const subject = new Subject({
//                 _id: mongoose.Types.ObjectId(),
//                 name: req.body.name,
//                 category: req.body.categoryId
//             })
//             return subject.save()
//         })
//         .then( result => {
//             console.log(result);
//             res.status(201).json({
//                 message:'Subject Stored',
//                 createdSubject: {
//                     _id: result._id,
//                     category: result.category,
//                     name:result.name
//                 }
//             })
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })
//         })
// })
    


// router.get('/:subjectId' ,(req, res, next) => {
//     const id = req.params.subjectId;
//     Subject.findById(id)
//         .exec()
//         .then(doc => {
//             console.log('From the database', doc);
//             if(doc) {
//                 res.status(200).json(doc)
//             }else{
//                 res.status(404).json({
//                     message:'No valid entry found for provided ID'
//                 })
//             }
           
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: err })
//         })
// })

// router.patch('/:subjectd' ,(req, res, next) => {
//     const id = req.params.subjectId;
//     const updateOps = {};
//     for( const ops of req.body) {
//         updateOps[ops.propName] = ops.value;
//     }
//     Subject.update({ _id: id }, {$set: updateOps })
//         .exec()
//         .then( result => {
//             console.log(result);
//             res.status(200).json(result)
//         })
//         .catch( err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })
//         })
// })

// router.delete('/:subjectId' ,(req, res, next) => {
//     const id = req.params.subjectId;
//     Subject.remove({ _id: id })
//         .exec()
//         .then( result => {
//             res.status(200).json(result)
//         })
//         .catch( err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })
//         })
// })

module.exports = router;