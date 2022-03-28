// libraries
import express from "express";

//database model
import{ MenuModel , ImageModel } from "../../database/allmodels";

const Router = express.Router();

/** 
Route      /list
Des         get all list menu based on particular restaurant id
Params      _id
Access      Public
Method      GET 
*/

Router.get('/list/:_id', async (req,res) => {
    try {
        const {_id} = req.params;
        const menu = await MenuModel.findById(_id);
        if(!menu){
            return res.status(400).json({error : "No menu present for this restaurant"});
        }
        return res.json({menus});
    } catch (error) {
        return res.status(500).json({error : error.message});
    }
});

/** 
Route      /iamge
Des         get all list menu images with restaurant id
Params      _id
Access      Public
Method      GET 
*/

Router.get('/image/:_id' , async (req,res) => {
   try {
       const {_id} = req.params;
       const menuImages = await ImageModel.findOne(_id);
       if(!menuImages){
        return res.status(400).json({error : "No iamge found !"});
    }
       return res.json({menuImages})
   } catch (
   error) {
    return res.status(500).json({error : error.message});
   }
})

export default Router;