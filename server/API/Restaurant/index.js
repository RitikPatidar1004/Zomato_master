// libraries
import express from "express";

//database model
import restaurantModel from "../../database/allmodels";


import {ValidateRestaurantCity,ValidateRestaurantSearchString} from '../../validation/restaurant';
import {validateId} from '../../validation/common';
const Router = express.Router();

 /** 
Route      /
Des         get all the restaurant details based on a specific city
Params      none 
Access      Public
Method      GET 
*/

Router.get('/' ,  async (req,res) => {
    try {
        //http://localhost/restaurant/?city=ncr
        await ValidateRestaurantCity(req.query);
        const {city} =req.query;
        const restaurants = await restaurantModel.find({city});
        if(restaurants.length === 0){
            return res.json({error : "No restaurants found in this city !!"})
        }
        return res.json({restaurants});
    } catch (error) {
        return res.status(500).json({error : error.message});
    }
});

 /** 
Route      /
Des         get individual restaurant details based of unique id
Params      none 
Access      Public
Method      GET 
*/
//http://localhost/restaurant/12355dvafv56d1sda
Router.get('/:_id' , async (req,res) => {
    try {
        await validateId(req.params);
        const {} = req.params;
        const restaurant = await restaurantModel.findById(_id);
        if(!restaurant){
            return res.status(404).json({error : "Restaurant did not found "});
        }
        res.json({restaurant});
    } catch (error) {
        return res.status(500).json({error : error.message});
    }
});

 /** 
Route      /search
Des         get  restaurant details based on search string
Params      none 
Access      Public
Method      GET 
*/
//http://localhost/restaurant/

Router.get('/search/:searchString' ,  async (req,res) => {
    try {
        await ValidateRestaurantSearchString(req.params);
         const {searchString} = req.params;
         const restaurants = await restaurantModel.find({
             name: { $regex : searchString , $options : "i"},
         });

         if(!restaurants){
             return res.status(404).json({error : 'No restaurant matched with ${searchString}'});
         }
         res.json({restaurants});
    } catch (error) {
        return res.status(500).json({error : error.message});
    }
});

export default Router;