// Library
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//Models
const { UserModel } = require("../../database/allmodels");
const { status } = require("express/lib/response");

//validation
const { validateSignup, validateSignin } = require("../../validation/auth");

//create a router
const Router = express.Router();

/** 
Router      /signup
Des         Register a new User
Params      none 
Access      Public
Method      Post 
*/

Router.post("/signup", async (req, res) => {
  try {
    await validateSignup(req.body.credentials);
    await UserModel.findByEmailAndPhone(req.body.credentials);
    const newUser = await UserModel.create(req.body.credentials);
    const token = newUser.generateJwtToken();
    return status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/** 
Router      /signin
Des         sign-in with email and password
Params      none 
Access      Public
Method      Post 
*/

Router.post("/signin", async (req, res) => {
  try {
    await validateSignin(req.body.credentials);
    const user = await UserModel.findByEmailAndPassword(req.body.credentials);
    const token = user.generateJwtToken();
    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/** 
Router      /google
Des         google signin
Params      none 
Access      Public
Method      GET 
*/
Router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

/** 
Router      /google/callback
Des         google signin callback
Params      none 
Access      Public
Method      GET 
*/

Router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    return res
      .status(200)
      .json({ token: req.session.passport.user.token, status: "success" });
  }
);

module.exports = Router;

/** This is also valid code but the upper code is more optimized and good way of doing an authentication.
 
Router.post("/signup" , async(req,res) => {
    try{
        const {email , password, fullname , phoneNumber} = req.body.credentials;
        const checkUserByEmail = await UserModel.findOne({email});
        const checkUserByPhone = await UserModel.findOne({phoneNumber});
        
        if (checkUserByEmail || checkUserByPhone){
            return res.json({ user: "User already exists !"})
        }

        // hash password
        const bcryptSalt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password , bcryptSalt);

        //save data to database
        await UserModel.create({...req.body.credentials , password : hashedPassword});

        //generate JWT auth token(package name = jsonwebtoken) 
        const token = jwt.sign({ user : {fullname , email} } , "ZomatoApp");
        return res.status(200).json({token ,  status : "success"});


    }catch(error){
        return res.status(500).json({error : error.message});
    }
});

module.exports= Router;

*/
