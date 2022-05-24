// Utils
const { catchAsync } = require('../utils/catchAsync');

// Models
const { User } = require('../models/userModel');
const { Event } = require('../models/eventModel');
const { UserEvent } = require('../models/usersEventModel');

const getEventsByUser = catchAsync( async (req, res) => {

    const { user } = req;

    const event = await Event.findAll({
        include: [{
            model: User,
            attributes: ['id', 'name', 'email']
        }],
        attributes: ['id', 'title', 'description', 'start', 'end', 'status'],
        where: { userId: user.id }
    });

    res.status(200).json({ event });

});

const createEvent = catchAsync( async (req, res) => {

    const { sessionUser } = req;

    const { title, description, start, end, status } = req.body;

    await Event.create({ title, description, start, end, status, userId: sessionUser.id });

    res.status(201).json({ status: 'success' });

});

const updateEvent = catchAsync( async (req, res) => {

    const { event } = req;

    const { title, description, startDate, endDate, status } = req.body;

    await event.update({ title, description, startDate, endDate, status });

    res.status(201).json({ status: 'success' });

});

const deleteEvent = catchAsync( async (req, res) => {

    const { event } = req;

    const { status } = req.body;

    await event.update({ status });

    res.status(201).json({ status: 'success' });

});

const getEventUserAsing = catchAsync( async (req, res) => {

    const { sessionUser } = req;

    const events = await UserEvent.findAll({
        include: [
            {
                model: User,
                attributes: ['id', 'name', 'email']
            },
            {
                model: Event,
                attributes: ['id', 'title', 'description', 'start', 'end', 'status']
            }
        ],
        where: { userId: sessionUser.id }
    });

    res.status(200).json({ events });

});

const updateAsignEvent = catchAsync( async (req, res) => {

    const { event } = req;

    const { title, description, startDate, endDate, status } = req.body;

    await event.update({ title, description, startDate, endDate, status });

    res.status(201).json({ status: 'success' });

});

const asingUserToEvent = catchAsync( async (req, res) => {

    const { sessionUser, event } = req;

    const { permission } = req.body;

    await UserEvent.create({ userId: sessionUser.id, eventId: event.id, permission });

    res.status(201).json({ status: 'success' });

});

const updateAsingUserToEvent = catchAsync( async (req, res) => {

    const { event } = req;

    const { permission } = req.body;

    await UserEvent.update({ permission }, { where: { eventId: event.id } });

    res.status(201).json({ status: 'success' });

});

module.exports = { 
    getEventsByUser,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventUserAsing,
    updateAsignEvent,
    asingUserToEvent,
    updateAsingUserToEvent
};