const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('./prisma/queries')

function initializePassport(passport) {

    async function authenticateUser(username, password, done) {

        try {
            const user = await db.getUserByUsername(username)

            if (!user) {
                return done(null, false, { message: "No user with that username found." })
            }
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Incorrect password." })
            }

        } catch (error) {
            return done(error);
        }
    }

    passport.use(new LocalStrategy(authenticateUser));

    passport.serializeUser((user, done) => {
        done(null, user.id); // Serialize user ID
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await db.getUserByID(id); // Find user by ID
            done(null, user);
        } catch (error) {
            done(error);
        }
    });

}

module.exports = initializePassport;