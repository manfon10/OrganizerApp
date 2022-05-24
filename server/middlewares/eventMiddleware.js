// Models
const { Event } = require('../models/eventModel');
const { UserEvent } = require('../models/usersEventModel');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const eventExists = catchAsync(async (req, res, next) => {

    const { id } = req.params;

    const event = await Event.findOne({
        where: { id }
    });

    if(!event) {
        return next(new AppError('Event does not exist with given Id', 404));
    }

    req.event = event;

    next();

});

const protectEventOwner = catchAsync( async (req, res, next) => {

    const { sessionUser, event } = req;

    if(sessionUser.id !== event.userId) {
        return next(new AppError('You do not have permission to edit that Event', 404));
    }

    next();

});

const protectEventAsign = catchAsync( async (req, res, next) => {

    const { sessionUser, event } = req;

    const eventAsign = await UserEvent.findOne({ where: { eventId: event.id } });

    if(eventAsign.permission !== "writing") {
        return next(new AppError('Access not granted', 403));
    }

    next();

});

module.exports = { eventExists, protectEventOwner, protectEventAsign };