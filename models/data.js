const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    x_data: {
        type: String,
        required: true
    },
    y_data: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Date = mongoose.model('Date', dataSchema);
module.exports = Date;
