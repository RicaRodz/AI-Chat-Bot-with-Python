import passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;
import pool from "./db.js";
import bcrypt from "bcrypt";

function initialize(passport) {
    const authenticateUser = (email, password, done) => {
        pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [email],
            (err, results) => {
                if(err) {
                    console.log('err', err);
                }

                if (results.rows.length > 0){
                    const user = results.rows[0];

                    bcrypt.compare(password, user.password, (err, isMatch)=>{
                        if(err){
                            throw err
                        }

                        if(isMatch){
                            return done(null, user);
                        } else {
                            console.log("Password is not correct")
                            return done(null, false, { message: "Password is not correct"})
                        }
                    });
                } else {
                    return done(null, false, {message: "Email is not registered"})
                }
            }
        )
    };

    passport.use(
        new LocalStrategy(
            {
                usernameField: "email", 
                passwordField: "password"
            },
            authenticateUser
        )
    );

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
            if (err) {
                throw err;
            }

            return done(null, results.rows[0]);
        });
    });
}

export default initialize;