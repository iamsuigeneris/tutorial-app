const express = require('express')
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')

const categoryRoutes = require('./api/routes/categories')
const subjectRoutes = require('./api/routes/subjects')
const lessonRoutes = require('./api/routes/lessons')



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// CORS settings
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type, Accept, Authorization'
)
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods',  'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
next()
})


// Calling the categories,subjects,lessons routes
app.use('/categories', categoryRoutes);
app.use('/subjects', subjectRoutes);
app.use('/lessons', lessonRoutes);

// Error Handling
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error);
})

// Error Handling
app.use((error, req, res, next) => {   
    res.status(error.status || 500);
    res.json({
        error:{ message: error.message }
    })
})

module.exports = app;