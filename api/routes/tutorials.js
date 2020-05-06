const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /tutorials'
    })
})

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST requests to /tutorials'
    })
})

router.get('/:tutorialId', (req, res, next) => {
    const id = req.params.productId;
    if(id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        })
        
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        })
    }
})

router.patch('/:tutorialId', (req, res, next) => {
    res.status(200).json({
        message:'Updated!'
    })
})

router.delete('/:tutorialId', (req, res, next) => {
    res.status(200).json({
        message:'Tutorial Deleted!'
    })
})

module.exports = router;