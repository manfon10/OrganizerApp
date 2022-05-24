const { Sequelize } = require('sequelize');
const process = require('dotenv').config();

const { DB, DB_HOST, DB_PASSWORD, DB_USER } = process.parsed;

const db = new Sequelize({
    dialect: 'mysql',
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB,
    logging: false
});

module.exports = { db };