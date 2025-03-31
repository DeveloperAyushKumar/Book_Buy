import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import User from "../users/user.model.js";

passport.use(
    new GoogleStrategy(
        {
            clientID:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            callbackURL:"http://localhost:3000/api/auth/google/callback",


        },
        async (accessToken,refreshToken,profile,done)=>{
            try {
                let user=await User.findOne({googleId:profile.id});
                console.log(user)
                if(!user){
                     console.log(profile)
                    user=new User({
                        username:profile.displayName,
                        googleId:profile.id,
                        email:profile.emails[0].value,
                        verified:true,
                    })
                    await user.save();
                }
                return done(null, user);

            }
            catch (err){
                return done(err,null);
            }
        }
    )
)
// passport.serializeUser((user, done) => {
//     console.log(user._id); // MongoDB ObjectId
//     console.log(user.id);  // String version
//     done(null, user.id);   // Stores user.id in session
//   });
// passport.deserializeUser((id,done)=>User.findById(id).then((user)=>done(null,user)));

export default passport