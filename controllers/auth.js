const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

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

        // Generate JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Please, contact administrator'
        });

    }

};

const loginUser = async(req, res = response) => {
    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect user or password'
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect user or password'
            })
        }

        // Generate JWT
        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Please, contact administrator'
        });

    }

};

const revalidateToken = async(req, res = response) => {

    const { uid, name } = req;

    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name
    })
};

module.exports = {
    createUser,
    loginUser,
    revalidateToken
}