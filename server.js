const express = require('express')
const cors  = require('cors')
const passport = require('passport')
const session = require('express-session');
const mongoose = require('mongoose')
const passportSetup = require("./Utils/passport");
const cookieSession = require("cookie-session");
const authRoute = require('./routes/auth.route')
const app = express()
const dotenv = require('dotenv')
const bodyparser = require("body-parser");
dotenv.config()


app.use(session({ secret: 'i love real madrid', resave:true, saveUninitialized:true }));



app.use(express.json())

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use(passport.initialize());
app.use(passport.session());


app.use(
  cookieSession({ name: "session", keys: ["adjamesuameszionsimonboateng"], maxAge: 24*60*60*1000 })
);



const port = process.env.PORT || 5000;
const uri = "mongodb+srv://pascal:SIMON2929+@simon.9u2l0.mongodb.net/test"
mongoose.connect("mongodb+srv://pascal:simon@cluster0.ukdgz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

.then(() =>{console.log("connected")})
.catch((error) =>{console.log(error)})




app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );
  
  
  app.use("/auth", authRoute);


app.listen(port, () =>
  console.log(`server running on PORT ${port} 🚀`)
);


