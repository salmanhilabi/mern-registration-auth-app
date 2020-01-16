const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require('./keys');
const User = require('../mysql/models/mysql_user');
const MongoUser = require('../mongodb/models/mongo_user');
const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, next) => {
      // MongoDb setup
      MongoUser.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return next(null, user);
          }
          return next(null, false);
        })
        .catch(err => console.log(err));
      // Mysql setup
      // User.findByPk(jwt_payload.id)
      //   .then(user => {
      //     if (user) {
      //       return next(null, user);
      //     }
      //     return next(null, false);
      //   })
      //   .catch(err => console.log(err));
    })
  );
};
