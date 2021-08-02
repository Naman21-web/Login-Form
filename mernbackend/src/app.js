//We have  added "-e js,hbs" in dev in package.json 
//This is used so that if we press save in any oof the files our nodemon server restarts

const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs')//Used to secure data
const hbs = require('hbs')
const app = express();

require("./db/conn")
const Register = require("./models/register")

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

const static_path = path.join(__dirname, "../public")//Set dirname to public
app.use(express.static(static_path))//Using that directory

const template_path = path.join(__dirname, "../templates/views")//Setting directory to views
const partials_path = path.join(__dirname, "../templates/partials")//Adding partial directory

app.set("view engine", "hbs");//Setting view engine as pug
app.set("views", template_path)

hbs.registerPartials(partials_path)//Adding hbs

app.get("/", (req, res) => {
    res.render("index")//Our file is in folder partials so we have 
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.post("/register", async (req, res) => {
    try {
        //console.log(req.body.email);
        // res.send(req.body.email)

        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;//.body.name : name shoul be same name as given in input form 

        if (password == confirmpassword) {
            const registerEmployee = new Register({
                email: req.body.email,
                password: password,//As we have defined password earlier
                confirmpassword: req.body.confirmpassword
            })
            const registered = await registerEmployee.save();
            res.status(201).render("index");
        }
        else {
            res.send("Passwords not matching")
        }
    } catch (error) {
        res.status(400).send(error);
    }

})

app.get("/login", (req, res) => {
    res.render("login")//Our file is in folder partials so we have 
})

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        //console.log(`${email} and password is ${password}`);

        const useremail = await Register.findOne({ email: email })//Both are same so we can also only write email
        if (useremail.password == password) {
            res.status(201).render("index")
        }
        else {
            res.send("Invalid username or password")
        }
    } catch (error) {
        res.status(400).send("Invalid login details")
    }
})

const securePassword = async (password) => {
   const passwordHash = await bcrypt.hash(password, 12);//12 round, more the rounds more the time to  and more the time it takes to register, default is 10 rounds
   console.log(passwordHash);

   const passwordMatch = await bcrypt.compare(password, passwordHash);
   console.log(passwordMatch);
}

securePassword("jainn")

app.listen(port, (req, res) => {
    console.log(`Server running at ${port}`);
})