const mongoose = require('mongoose');

const tutorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', require: true },
    name: { type: String , require : true }
})

module.exports = mongoose.model('Tutor', tutorSchema)