
require("@babel/core").transform("code", { presets: ["@babel/preset-env"],

});

require('dotenv').config();

import express from "express";
import cors from "cors";
import helmet from "helmet";

//Database Connection
import ConnectDB from "./database/connection";


//google authentication configuration
import googleAuthConfig from "./config/google.config";

//priavte routes authentucation config
import privateRouteConfig from "./config/route.config";

//API
import Auth from './API/Auth';
import Restaurant from './API/Restaurant';
import Food from './API/Food';
import Menu from './API/Menu';
import Image from './API/Image';
import Order from "./API/Orders"
import Review from "./API/Reviews"
import User from "./API/User"
import passport from "passport";

//passport config
googleAuthConfig(passport);
privateRouteConfig(passport);

const zomato = express();
zomato.use(cors());
zomato.use(express.json());
zomato.use(helmet());
zomato.use(passport.initialize());
// zomato.use(passport.session());



// Application Routes
zomato.use("/auth",Auth);
zomato.use("/restaurant",Restaurant);
zomato.use("/food" , Food);
zomato.use("/menu" , Menu);
zomato.use("/image",Image);
zomato.use("/order",Order);
zomato.use("/review",Review);
zomato.use("/user",User);


// http://localhost:3000/

zomato.listen(3000, () =>{
    ConnectDB().then(() => {
        console.log("Server is running !!!");
    }).catch((error) => {
        console.log("Server is running , but database connection failed.......");
        console.log(error);
    })
});