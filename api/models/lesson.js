const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String
})

module.exports = mongoose.model('Lesson', lessonSchema)