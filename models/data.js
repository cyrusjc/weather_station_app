const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    points: {
        type: Object,
        required: true
    },
}, { timestamps: true })

const Date = mongoose.model('Date', dataSchema);
module.exports = Date;
