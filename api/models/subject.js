const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', require: true },
    name: { type: String , require : true }
})

module.exports = mongoose.model('Subject', subjectSchema)