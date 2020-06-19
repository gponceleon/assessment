const { ExtractJwt, Strategy } = require('passport-jwt');

const userService = require('../services/users.service');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
};


module.exports = new Strategy(options, function ({ id }, done) {

    userService.getUserById(id)
        .then(user => {
            console.log(user)
            user && done(null, { ...user, id });
            !user && done(null, null);
        })
        .catch(error => {
            console.error(error);
            done(null, null);
        })
        ;
});