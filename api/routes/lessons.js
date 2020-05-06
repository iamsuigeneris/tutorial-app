const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /lessons'
    })
})

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /lessons'
    })
})

router.get('/:lessonId' ,(req, res, next) => {
    const id = req.params.lessonId;
    if( id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID for lesson',
            lessonId: req.params.lessonId
        })
    } else {
        res.status(200).json({
            message: 'You passed an Id'
        })
    }
})

router.patch('/:lessonId' ,(req, res, next) => {
    res.status(200).json({
        message: 'Updated lesson!',
        lessonId: req.params.lessonId
    })
})

router.delete('/:lessonId' ,(req, res, next) => {
    res.status(200).json({
        message: 'Deleted lesson!'
    })
})

module.exports = router;