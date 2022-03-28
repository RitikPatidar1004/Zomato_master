// Library
import express from "express";

// Database modal
import {ReviewModel} from "../../database/allModels";

const Router = express.Router();

/**
 * Route        /:resid
 * Des          get all reviews for a particular restaurant
 * Params       resid
 * Access       Public
 * Method       GET
 */
 Router.get("/:resid" , async(req,res) => {
     try {
         const {resid} = req.params;
         const reviews = await ReviewModel.find({ restarants : resid});

         return res.json({reviews});
     } catch (errro) {
        return res.status(400).json({ error : "user not found "})
     }
 });

 /**
 * Route        /new
 * Des          Post : Adding new food/restaurant review and rating
 * Params       none
 * Access       Public
 * Method       POST
 */

 Router.post("/new" , async(req,res) => {
     try {
         const {reviewData} = req.body;

         await ReviewModel.create({...reviewData});

         return res.json({reviews : "Succesfully created a review"})
     } catch (error) {
        return res.status(400).json({ error : "user not found "})
     }
 });

 /**
 * Route        /delete
 * Des          delete a specific review
 * Params       _id
 * Access       Public
 * Method       DELETE
 */

 Router.delete("/delete/:id" , async (req, res) =>{
     try {
         
     } catch (error) {
        return res.status(400).json({ error : "user not found "})
     }
 })
export default Router;