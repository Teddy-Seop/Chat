"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const UserModel_1 = __importDefault(require("../Models/UserModel"));
// const JWTStrategy = passportJWT.Strategy;
// const ExtractJWT = passportJWT.ExtractJWT;
const LocalStrategy = passport_local_1.default.Strategy;
class Passport {
    constructor() {
        this.config = () => {
            // Local Strategy
            passport_1.default.use(new LocalStrategy({
                usernameField: 'id',
                passwordField: 'pw'
            }, (id, pw, done) => {
                return UserModel_1.default.findOne({
                    where: {
                        id: id,
                        pw: pw
                    }
                })
                    .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'Incorrect ID or PW' });
                    }
                    return done(null, user, { message: 'Login Success' });
                })
                    .catch(err => done(err));
            }));
            // JWT Strategy
            // passport.use(new JWTStrategy({
            //     jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            //     secretOrKey: process.env.JWT_SECRETE
            // })),
            // (jwtPayload, done) => {
            //     return User.findOne({
            //         where: {
            //             id: jwtPayload.id
            //         }
            //     })
            //     .then(user => {
            //         return done(null, user);
            //     })
            //     .catch(err => {
            //         return done(err);
            //     })
            // }
            passport_1.default.serializeUser((user, done) => {
                done(null, user);
            });
            passport_1.default.deserializeUser(function (user, done) {
                done(null, user);
            });
        };
        this.isAuthenticated = (req, res, next) => {
            if (req.isAuthenticated()) {
                return next();
            }
            res.redirect("/");
        };
    }
}
exports.default = Passport;
//# sourceMappingURL=passport.js.map