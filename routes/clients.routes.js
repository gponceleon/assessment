const clientCtrl = require('../api/controllers/client.controller');
const passport = require('passport');

module.exports = function (app, express) {
    const rClients = express.Router();
    rClients
        .get("/:userId", clientCtrl.clientById)

    app.use(`${process.env.ROUTE}/clients`, rClients)
}
