const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });
        // console.log(user)
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already on use'
            })
        }

        user = new User(req.body);

        // password encryption
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Please, contact administrator'
        });

    }

};

const loginUser = (req, res = response) => {
    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    })
};

const renewUser = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
};

module.exports = {
    createUser,
    loginUser,
    renewUser
}