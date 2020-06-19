const policiesCtrl = require('../api/controllers/policies.controller');
const passport = require('passport');

module.exports = function (app, express) {
    const rPolicies = express.Router();
    rPolicies
        .get("/", passport.authenticate('jwt', { session: false }), policiesCtrl.policiesByUsername)
        .get("/:policyId", passport.authenticate('jwt', { session: false }), policiesCtrl.policiesById)
    app.use(`${process.env.ROUTE}/policies`, rPolicies)
}
