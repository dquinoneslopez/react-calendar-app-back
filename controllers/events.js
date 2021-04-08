const { response } = require('express');
const Event = require('../models/Event');

// {
//     ok: true,
//     msg: 'event name'
// }

const getEvents = async(req, res = response) => {

    try {

        res.status(200).json({
            ok: true,
            msg: '[EVENT] getEvents'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Please, contact administrator'
        });
    }

}

const createEvent = async(req, res = response) => {

    try {

        const event = new Event(req.body);
        await event.save();

        res.status(201).json({
            ok: true,
            msg: '[EVENT] createEvent'
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Please, contact administrator'
        });

    }

}

const updateEvent = async(req, res = response) => {
    try {

        res.status(201).json({
            ok: true,
            msg: '[EVENT] updateEvent'
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Please, contact administrator'
        });

    }
}

const deleteEvent = async(req, res = response) => {
    try {

        res.status(201).json({
            ok: true,
            msg: '[EVENT] deleteEvent'
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Please, contact administrator'
        });

    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}