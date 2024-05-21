import passport from 'passport';
import local from 'passport-local';
import { modelUser } from '../dao/models/user.model.js';
import { coockieExtractror, createHash, isValidPassword } from '../utils.js';
import UserService from '../services/users.service.js';
import GitHubStategy from 'passport-github2'
import jwt from 'passport-jwt';
import { config } from './config.js';

const LocalStrategy = local.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const passportInit = () => {
    passport.use('jwt', new jwt.Strategy({
        jwtFromRequest: ExtractJwt.fromExtractors([coockieExtractror]),
        secretOrKey: config.SECRET_TOKEN
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload.user);
        } catch (error) {
            return done(error);
        }
    }))

    passport.use('signup', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
        const { email, first_name, last_name, age } = req.body;
        try {
            const user = await modelUser.findOne({ email });
            if (user) {
                return done(null, false);
            }
            const newUser = {
                email,
                first_name,
                last_name,
                age: Number.parseInt(age),
                role: 'user',
                password: createHash(password)
            };
            const result = await modelUser.create(newUser);
            return done(null, result);
        }
        catch (error) {
            return done('Error al registrar el usuario: ' + error);
        }
    }))

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await modelUser.findOne({ email: username });
            if (!user) {
                return done(null, false);
            }
            if (!isValidPassword(user, password)) {
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done('Error al iniciar sesión: ' + error);
        }
    }))

    passport.use(
        "github",
        new GitHubStategy.Strategy(
            {
                clientID: "Iv1.e1c30c3270db0b9d",
                clientSecret: config.GITHUB_SECRET,
                callbackURL: "http://localhost:8080/api/sessions/callbackGithub",
            },
            async function (accessToken, refreshToken, profile, done) {
                try {
                    let email = profile._json.email
                    if (!email) {
                        return done(null, false)
                    }
                    let user = await modelUser.findOne({ email })
                    if (!user) {
                        user = await modelUser.create({
                            name, email,
                            profileGithub: profile
                        })
                    }
                    return done(null, user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        return done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await UserService.getBy({ _id: id })
        return done(null, user)
    })
}

export default passportInit;