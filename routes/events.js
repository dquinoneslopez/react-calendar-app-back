/**
 * Event routes
 * host + /api/events
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { jwtValidator } = require('../middlewares/jwt-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { isDate } = require('../helpers/isdate');

const router = Router();

// Middleware
router.use(jwtValidator);

// Routes
router.get('/', getEvents);

router.post(
    '/', [
        check('title', 'Title needed').not().isEmpty(),
        check('start', 'Start date needed').custom(isDate),
        check('end', 'End date needed').custom(isDate),
        fieldValidator
    ],
    createEvent
);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;