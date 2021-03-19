/**
 * Users routes / Auth
 * host + /api/auth
 */

const { Router } = require('express');
const { createUser, loginUser, renewUser } = require('../controllers/auth');
const router = Router();

router.post('/', loginUser);

router.post('/new', createUser);

router.get('/renew', renewUser);

module.exports = router;