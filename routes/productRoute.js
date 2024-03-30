import express from "express";
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import {
    carCategoryController,
    carCountController,
    carFilterController,
    carListController,
    createProductController,
    deleteProductController,
    getPhotoController,
    getProductController,
    searchCarController,
    singleProductController,
    updateProductController
} from "../controllers/productController.js";
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
//filter cars
router.post('/cars-filter', carFilterController)
//car count
router.get('/car-count', carCountController)
//car list
router.get('/car-list/:page', carListController)
//search car
router.get('/search/:keyword', searchCarController)
//category wise cars
router.get('/car-category/:slug', carCategoryController)
export default router