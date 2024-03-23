import { Strategy } from "passport-local";
import bcryptjs from "bcryptjs";
import UserService from "../../services/User.service";
import passportJwt from "passport-jwt";
import { User } from "../../models";

let security: { saltRound: number; secret: any; token_expiration: number } = {
  saltRound: 10,
  secret: "SECRET_KEY",
  token_expiration: 60 * 60 * 24 * 30,
};

let localStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (username, password, done) => {
    UserService.findByEmail(username)
      .then((user: User) => {
        if (!user) {
          return done(null, false, {
            message: "Login Failed: Invalid Username or password!",
          });
        } else {
          bcryptjs.compare(
            password,
            `${user.password}`,
            (error: any, isMatch: boolean) => {
              if (error) {
                return done(null, false, error);
              } else if (!isMatch) {
                return done(null, false, {
                  message: "Login Failed: Invalid Username or password!",
                });
              } else {
                return done(null, user.toJSON());
              }
            }
          );
        }
      })
      .catch((error: any) => {
        done(error);
      });
  }
);

export default { localStrategy, security };
