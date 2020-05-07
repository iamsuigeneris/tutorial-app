const mongoose = require('mongoose');

const tutorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String
})

module.exports = mongoose.model('Tutor', tutorSchema)