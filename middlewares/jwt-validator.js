const { response } = require('express');
const jwt = require('jsonwebtoken');

const jwtValidator = (req, res = response, next) => {

    // x-token in headers
    const token = req.header('x-token');

    if (!token) {

        return res.status(400).json({
            ok: false,
            msg: 'There is no token in the petition'
        });

    }

    try {

        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.uid = uid;
        req.name = name;

    } catch (error) {

        return res.status(400).json({
            ok: false,
            msg: 'Token not valid'
        })

    }

    next();

}

module.exports = {
    jwtValidator
}