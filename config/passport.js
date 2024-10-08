const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const config = require('./config');
const logger = require('./logger');
// const { tokenTypes } = require('./tokens');
const { userService } = require('../services');
const randomString = require('../utils/randomString');

// JWT Strategy
const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await userService.getUserById(payload.sub);
    if (!user || user.is_deleted || !user.status || !user.is_approved || !user.is_otp_verified) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy
};
