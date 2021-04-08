const { response } = require('express');
const Event = require('../models/Event');

// {
//     ok: true,
//     msg: 'event name'
// }

const getEvents = async(req, res = response) => {

    const events = await Event.find().populate('user', 'name');

    try {

        res.status(200).json({
            ok: true,
            events
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Please, contact administrator'
        });
    }

}

const createEvent = async(req, res = response) => {

    const event = new Event(req.body);

    try {

        event.user = req.uid;

        const eventDB = await event.save();

        res.status(201).json({
            ok: true,
            event: eventDB
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Please, contact administrator'
        });

    }

}

const updateEvent = async(req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventId);

        if (!event) {

            res.status(404).json({
                ok: false,
                msg: 'No event with that id'
            });

        }

        if (event.user.toString() !== uid) {

            res.status(401).json({
                ok: false,
                msg: 'You are not allowed to do that'
            });

        }

        const newEvent = {
            ...req.body,
            user: uid
        };

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

        res.status(201).json({
            ok: true,
            event: updatedEvent
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