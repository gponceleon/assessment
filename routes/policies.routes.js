const policiesCtrl = require('../api/controllers/policies.controller');
const passport = require('passport');

module.exports = function (app, express) {
    const rPolicies = express.Router();
    rPolicies
        .get("/", policiesCtrl.policiesByUsername)
        .get("/:policyId", policiesCtrl.policiesById)
    app.use(`${process.env.ROUTE}/policies`, rPolicies)
}
