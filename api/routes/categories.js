const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Category = require('../models/category')

router.get('/', (req, res, next) => {
    Category
        .find()
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
    const category = new Category({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name
    })
    category
        .save()
        .then( result => {
            console.log(result);
            res.status(201).json({
                message:'Handling POST requests to /categories',
                createdCategory: result
            })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })

    })
})


router.get('/:categoryId' ,(req, res, next) => {
    const id = req.params.categoryId;
    Category
        .findById(id)
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

router.patch('/:categoryId' ,(req, res, next) => {
    const id = req.params.categoryId;
    const updateOps = {};
    for( const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Category.update({ _id: id }, {$set: updateOps })
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

router.delete('/:categoryId' ,(req, res, next) => {
    const id = req.params.categoryId;
    Category.remove({ _id: id })
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