import bcrypt from "bcrypt";
import express from "express";
import cors from "cors";
import pool from "./db.js"
import session from "express-session";
import flash from "express-flash";
import passport from "passport";
const salt = 10;

import initialize from './passportConfig.js';

initialize(passport);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    session({
        secret: "secret",
        resave: false, 
        saveUninitialized: true
    })
)

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//The database and backend routes work on http://localhost:5001 aka app.*
//the frontend webpages run in http://localhost:3000
app.post('/signup', async(req, res) => {
    const { name, email, password } = req.body;

    try{
        bcrypt.hash(password[0].toString(), salt, async (err, hash) => {
            if (err) {
                throw err;
            }
            const newUser = await pool.query(
                "INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING *",
                [name, email, hash]
            );        
            if (newUser.rows[0]){
                console.log(newUser.rows[0])
                res.redirect("http://localhost:3000/")
            }
        })
    } catch {
        res.redirect("http://localhost:3000/signup")
    }
})

app.post('/login', passport.authenticate('local', {
    successRedirect: "http://localhost:3000/home",
    failureRedirect: "http://localhost:3000/",
    failureFlash: true
}));

app.get('/logout', (req, res) =>{
    req.session.destroy();
    res.redirect("http://localhost:3000/")
})

//functions that will make sure that the user is logged in!
//can be used to restrict some webpages, such as the home page.
//When used in a route, the app will make sure that the user is logged in
//before redirecting the user to that webpage.
export function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        res.redirect('http://localhost:3000/home');
    }
    next();
}

export function checkNotAuthenticated(req, res, next){
    if (!req.isAuthenticated()){
        res.redirect('http://localhost:3000/');
    }
    next();
}

app.listen(5001, () => {
    console.log(`app running on port 5001.`)
})