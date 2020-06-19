const express = require('express');
const app = express();
const passport = require('passport');


const fs = require('fs');

require('./config/express')(app);

if (fs.existsSync('./.env')) {
    require('dotenv').config();
}


const config = {
    appRoot: __dirname,
};


require('./routes/clients.routes')(app, express);
require('./routes/policies.routes')(app, express);

module.exports = app; // for testing

const port = process.env.PORT || 80;
const host = process.env.HOST || 'localhost';

app.listen(port, () => {
    console.log(`Api is running on http://${host}:${port}`);
})

