import express from "express";
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import { createProductController, deleteProductController, getPhotoController, getProductController, singleProductController, updateProductController } from "../controllers/productController.js";
import formidable from 'express-formidable'

const router = express.Router()

//routes
router.post('/create-cars', requireSignIn, isAdmin, formidable(), createProductController);
//get all car
router.get('/all-cars/', getProductController)
//single car
router.get('/single-car/:slug', singleProductController)
//get photo
router.get('/car-photo/:id', getPhotoController)
//delete car
router.delete('/delete-car/:id', deleteProductController)
//update cars
router.put('/update-cars/:id', requireSignIn, isAdmin, formidable(), updateProductController);
export default router