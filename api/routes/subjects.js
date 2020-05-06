const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /subjects'
    })
})

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /categories'
    })
})

router.get('/:categoryId' ,(req, res, next) => {
    const id = req.params.categoryId;
    if( id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            categoryId: req.params.categoryId
        })
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        })
    }
})

router.patch('/:categoryId' ,(req, res, next) => {
    res.status(200).json({
        message: 'Updated category!',
        categoryId: req.params.categoryId
    })
})

router.delete('/:categoryId' ,(req, res, next) => {
    res.status(200).json({
        message: 'Deleted product!'
    })
})

module.exports = router;