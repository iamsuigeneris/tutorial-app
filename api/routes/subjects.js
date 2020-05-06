const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /subjects'
    })
})

router.post('/', (req, res, next) => {
    const subject = {
        name: req.params.name
    }
    res.status(200).json({
        message: 'Handling POST requests to /subjects',
        createdSubject: subject
    })
})

router.get('/:subjectId' ,(req, res, next) => {
    const id = req.params.subjectId;
    if( id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            subjectId: req.params.subjectId
        })
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        })
    }
})

router.patch('/:subjectId' ,(req, res, next) => {
    res.status(200).json({
        message: 'Updated subject!',
        subjectId: req.params.subjectId
    })
})

router.delete('/:subjectId' ,(req, res, next) => {
    res.status(200).json({
        message: 'Deleted subject!'
    })
})

module.exports = router;