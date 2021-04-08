/**
 * Event routes
 * host + /api/events
 */

const { Router } = require('express');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { jwtValidator } = require('../middlewares/jwt-validator');

const router = Router();

// Middleware
router.use(jwtValidator);

// Routes
router.get('/', getEvents);

router.post('/', createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;