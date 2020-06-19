const clientCtrl = require('../api/controllers/client.controller');
const passport = require('passport');

module.exports = function (app, express) {
    const rClients = express.Router();
    rClients
        .get("/:userId", passport.authenticate('jwt', { session: false }), clientCtrl.clientById)
        .get("/", passport.authenticate('jwt', { session: false }), clientCtrl.clientByName)
    app.use(`${process.env.ROUTE}/clients`, rClients)
}
