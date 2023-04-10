// require("@babel/core").transform("code", { presets: ["@babel/preset-env"],

// });

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

//Database Connection
const ConnectDB = require("./database/connection");

//google authentication configuration
const googleAuthConfig = require("./config/google.config");

//priavte routes authentucation config
const privateRouteConfig = require("./config/route.config");

//API
const Auth = require("./API/Auth");
const Restaurant = require("./API/Restaurant");
const Food = require("./API/Food");
const Menu = require("./API/Menu");
const Image = require("./API/Image");
const Order = require("./API/Orders");
const Review = require("./API/Reviews");
// const User = require("./API/User");
const passport = require("passport");

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
zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);
zomato.use("/menu", Menu);
zomato.use("/image", Image);
zomato.use("/order", Order);
zomato.use("/review", Review);
// zomato.use("/user", User);

// http://localhost:3000/

zomato.listen(3000, () => {
  ConnectDB()
    .then(() => {
      console.log("Server is running !!!");
    })
    .catch((error) => {
      console.log("Server is running , but database connection failed.......");
      console.log(error);
    });
});
