const googleOAuth = require("passport-google-oauth20");
const { UserModel } = require("../database/allModels");

const GoogleStrategy = googleOAuth.Strategy;

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        // create a new user object
        const newUser = {
          fullName: profile.displayName,
          email: profile.emails[0].value,
          profilePic: profile.photos[0].value,
        };

        try {
          // check if the user exist
          const user = await UserModel.findOne({ email: newUser.email });

          if (user) {
            // generate token
            const token = user.generateJwtToken();

            // return user
            done(null, { user, token });
          } else {
            // create new user
            const user = await UserModel.create(newUser);

            // generate token
            const token = user.generateJwtToken();

            // return user
            done(null, { user, token });
          }
        } catch (error) {
          done(error, null);
        }
      }
    )
  );

  passport.serializeUser((userData, done) => done(null, { ...userData }));
  passport.deserializeUser((id, done) => done(null, id));
};
// const googleOAuth =require( "passport-google-oauth20");
// const UserModel =require( "../database/allmodels");

// const GoogleStrategy = googleOAuth.Strategy;

// module.exports= (passport) => {
//     passport.use(
//         new GoogleStrategy(
//             {
//                 clientID : process.env.GOOGLE_CLIENT_ID,
//                 clientSecret : process.env.GOOGLE_CLIENT_SECRET,
//                 callbackURL : "http://localhost:3000/auth/google/callback",
//             },
//             async (accessToken , refreshToken ,profile,done) => {
//                 //create a new user object
//                 const newUser = {
//                     fullname : profile.displayName,
//                     email : profile.emails[0].value,
//                     profilepic : profile.photos[0].value,
//                 };

//                 try {
//                     //check if the user exixts
//                     const user = await UserModel.findOne({email : newUser.email });

//                     if(user){
//                         //generate token
//                         const token = user.generateJwtToken();

//                         //return user
//                         done(null, {user , token});
//                     }
//                     else{
//                         //create new user
//                         const user = await UserModel.create(newUser);

//                         //generate token
//                         const token = user.generateJwtToken();

//                         //return user
//                         done(null , {user , token});
//                     }
//                 } catch (error) {
//                     done(error,null);
//                 }

//             }
//         )
//     );
//     passport.serializeUser((userData , done) => done(null, {...userData}));
//     passport.deserializeUser((id,done) => done(null,id));
// }
