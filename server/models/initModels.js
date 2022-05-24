// Models
const { User } = require('../models/userModel');
const { Event } = require('../models/eventModel');
const { UserEvent } = require('../models/usersEventModel');

const initModels = () => {

    User.hasMany(Event);
    Event.belongsTo(User);

    User.hasMany(UserEvent);
    UserEvent.belongsTo(User);

    Event.hasMany(UserEvent);
    UserEvent.belongsTo(Event);
}

module.exports = { initModels };