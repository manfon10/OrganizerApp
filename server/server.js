const { app } = require('./index');
const proccess = require('dotenv').config();

// Models Asociations

const { initModels } = require('./models/initModels');

// Utils

const { db } = require('./utils/database');

// Authenticate database

db.authenticate()
    .then( () => console.log('Database athenticated') )
    .catch( error => console.log(error) );

// Asociations

initModels();

// Sync sequelize models

db.sync({ force: false })
    .then(() => console.log('Database synced'))
    .catch(err => console.log(err));

// Up server

app.listen(proccess.parsed.PORT || 4000, () => {
    console.log(`Server Organizer Running on port ${proccess.parsed.PORT}`);
});