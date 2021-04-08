const { Schema, model } = require('mongoose');

const EventSchema = Schema({
    name: {
        type: String,
        require: true
    },
    id: {
        type: Date,
    },
    title: {
        type: String
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    bgcolor: {
        type: String
    },
    notes: {
        type: String
    },
    user: {
        _id: {
            type: String
        },
        name: {
            type: String
        }
    }
});

module.exports = model('Event', EventSchema);