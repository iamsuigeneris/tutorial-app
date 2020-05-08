const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', require: true },
    title: { type: String , require : true }
})

module.exports = mongoose.model('Lesson', lessonSchema)