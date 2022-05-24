const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const UserEvent = db.define('users_events', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    permission: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = { UserEvent };