const mongoose = require('mongoose')
const Category = require('../models/category')

exports.categories_get_all = (req, res, next) => {
    Category
        .find()
        .then( docs => {
            res.status(200).json({
                count: docs.length,
                categories: docs.map( doc => {
                    return {
                        _id: doc._id,
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

exports.categories_post_one = (req, res, next) => {
    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
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
}

exports.categories_get_one = (req, res, next) => {
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
}

exports.categories_patch_one = (req, res, next) => {
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
}

exports.categories_delete_one = (req, res, next) => {
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
}