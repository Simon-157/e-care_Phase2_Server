const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require('../models/UserModel');

const GOOGLE_CLIENT_ID = "153407214129-savvh33pc3cav85b1mhp305jscfpuqu0.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"
var date = new Date();



passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
    done(null, user);
  });
  
});



passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },

    (accessToken, refreshToken, profile, done)=>{
      
      // console.log(profile);
      User.findOne({googleId:profile.id}).then(currentUser => {
        if(currentUser){
          console.log(currentUser.name + " already exists");
          done(null, currentUser);
        }
        else{
            new User({
            googleId: profile.id,
            avatar: profile.photos[0].value,
            name:profile.displayName,
            Date: date.toLocaleString()
          }).save().then(newUser => {console.log(newUser +  " new user registered"),
          
          done(null, newUser)
          
        })
      
      }
    })
  }
))
    
    




