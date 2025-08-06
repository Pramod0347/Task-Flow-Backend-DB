const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
    },
    {
        timestaps: true,
    }
)

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;