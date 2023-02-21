const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
const UserModel = require('../models/user.model');
// importing from library

// for callling secrets from env file 
// we need to have config env for that \/
// require('dotenv).config();
const GOOGLE_CLIENT_ID = '676441716938-t234mefdepogon81hcu8q7rsohjuhstk.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET= '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';


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID, // for env file we can use ---> proceess.env.GOOGLE_CLIENT_ID <---- like this
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"  // here we have to add our app url instead of example.com
    // here we have added app url ---> http://localhost:8080 
  },
  
  async function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
        // console.log(profile._json);
        const name= profile._json.name;
        const email= profile._json.email;
        // const user= new UserModel({name,email})
        // await user.save();

          return cb(null, name,email);
  }
));
// export this passport to be used in our routes
module.exports= passport;