const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Utils

const { globalErrorHandler } = require('./utils/errors');

// Routes

const { userRoutes } = require('./routes/usersRoutes');
const { eventRoutes } = require('./routes/eventRoutes');

// Endpoints

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/events', eventRoutes);

// Global error

app.use('*', globalErrorHandler);

module.exports = { app };