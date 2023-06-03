"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.loginUser = exports.createUser = void 0;
const user_1 = require("../models/user");
const auth_1 = require("../services/auth");
const createUser = async (req, res, next) => {
    const newUser = new user_1.User({
        username: req.body.username,
        password: req.body.password
    });
    try {
        if (newUser.username && newUser.password) {
            let hashedPassword = await (0, auth_1.hashPassword)(newUser.password);
            newUser.password = hashedPassword;
            let created = await newUser.save();
            res.status(201).json({
                username: created.username,
                userId: created._id
            });
        }
        else {
            res.status(400).send('Username and password required');
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.createUser = createUser;
const loginUser = async (req, res, next) => {
    let existingUser = await user_1.User.findOne({ username: req.body.username });
    if (existingUser) {
        let passwordsMatch = await (0, auth_1.comparePasswords)(req.body.password, existingUser.password);
        if (passwordsMatch) {
            let token = await (0, auth_1.signUserToken)(existingUser);
            res.status(200).json({ token });
        }
        else {
            res.status(401).json('Invalid password');
        }
    }
    else {
        res.status(401).json('Invalid username');
    }
};
exports.loginUser = loginUser;
const getUser = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req, res, next);
    if (user) {
        let { _id, username } = user;
        res.status(200).json({
            _id,
            username
        });
    }
    else {
        res.status(401).send();
    }
};
exports.getUser = getUser;
