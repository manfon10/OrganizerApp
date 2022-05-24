// Libraries
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const process = require('dotenv').config();

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

// Models
const { User } = require('../models/userModel');

const getAllUsers = catchAsync( async (req, res) => {

    const users = await User.findAll();

    users.password = undefined;

    res.status(200).json({ users });

});

const signup = catchAsync( async (req, res) => {

    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({ name, email, password: passwordHash });

    newUser.password = undefined;

    res.status(201).json({ status: 'success', newUser });

});

const login = catchAsync( async (req, res, next) => {

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    //Compare password hasheada
    if( !user || !(await bcrypt.compare(password, user.password)) ) {
        return next(new AppError('Invalid credentials', 400));
    }

    // Generate Token
    const token = await jwt.sign({ id: user.id }, process.parsed.JWT_SECRET, {
        expiresIn: process.parsed.JWT_EXPIRES_IN
    });

    user.password = undefined;

    res.status(200).json({ token, user });

});

module.exports = { getAllUsers, signup, login };