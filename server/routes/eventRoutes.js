const express = require('express');

const router = express.Router();

// Controllers

const { 
    getEventsByUser,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventUserAsing,
    updateAsignEvent,
    asingUserToEvent,
    updateAsingUserToEvent 
} = require('../controllers/eventController');

// Middlewares

const { protectToken, userExists } = require('../middlewares/userMiddleware');
const { eventExists, protectEventOwner, protectEventAsign } = require('../middlewares/eventMiddleware');
const { createEventValidations, checkValidations } = require('../middlewares/fieldsMiddleware');

// Protected routes

router.use(protectToken);

router
    .route('/:id')
    .get(
        userExists, 
        getEventsByUser
    )
    .patch(
        eventExists,
        updateEvent
    )
    .delete(
        eventExists, 
        deleteEvent
    );

router.get('/list_asign_event/:id', userExists, getEventUserAsing);

router.patch('/update_asign_event/:id', eventExists, protectEventAsign, updateAsignEvent);

router
    .route('/asign_user_event/:id')
    .post(
        eventExists, 
        protectEventOwner, 
        asingUserToEvent
    )
    .patch(
        eventExists, 
        protectEventOwner, 
        updateAsingUserToEvent
    );

router.post(
    '/', 
    createEventValidations, 
    checkValidations, 
    createEvent
);

module.exports = { eventRoutes: router };