import passport from 'passport';
import passportJWT from 'passport-jwt';
import passportLocal from 'passport-local';
import User from '../Models/UserModel';

// const JWTStrategy = passportJWT.Strategy;
// const ExtractJWT = passportJWT.ExtractJWT;
const LocalStrategy = passportLocal.Strategy;

class Passport {
    public config = () => {
        // Local Strategy
        passport.use(new LocalStrategy({
            usernameField: 'id',
            passwordField: 'pw'
        },
        (id, pw, done) => {
            return User.findOne({
                where: {
                    id: id,
                    pw: pw
                }
            })
            .then(user => {
                if(!user) {
                    return done(null, false, { message: 'Incorrect ID or PW' })
                }
    
                return done(null, user, { message: 'Login Success' });
            })
            .catch(err => done(err));
        }))
    
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
        passport.serializeUser<any, any>((user, done) => {
            done(null, user);
        });
         
        passport.deserializeUser(function(user, done) {
            done(null, user);
        });
    }
    
    public isAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/");
    };
}

export default Passport;