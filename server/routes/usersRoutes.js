const express = require('express');

const router = express.Router();

// Controllers

const { getAllUsers, signup, login } = require('../controllers/userController');

// Middlewares

const { createUserValidations, checkValidations } = require('../middlewares/fieldsMiddleware');
const { protectToken } = require('../middlewares/userMiddleware');

// Routes

router.post('/signup', createUserValidations, checkValidations, signup);
router.post('/login', login);

// Routes protected

router.use(protectToken);

router.get('/', getAllUsers);

module.exports = { userRoutes: router };