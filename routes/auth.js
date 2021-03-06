/**
 * Users routes / Auth
 * host + /api/auth
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { jwtValidator } = require('../middlewares/jwt-validator');

const router = Router();

router.post(
    '/new', [ // middleware
        check('name', 'Name required').not().isEmpty(),
        check('email', 'Email required').isEmail(),
        check('password', 'Password must have at least 6 characters').isLength({ min: 6 }),
        fieldValidator
    ],
    createUser
);

router.post(
    '/', [
        check('email', 'Email required').isEmail(),
        check('password', 'Password must have at least 6 characters').isLength({ min: 6 }),
        fieldValidator
    ],
    loginUser
);

router.get('/renew', jwtValidator, revalidateToken);

module.exports = router;