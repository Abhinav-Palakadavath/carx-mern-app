import productModel from "../models/productModel.js";
import fs from 'fs'
import slugify from 'slugify';

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category } = req.fields
        const { photo } = req.files
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' })
            case !description:
                return res.status(500).send({ error: 'Description is required' })
            case !price:
                return res.status(500).send({ error: 'Price is required' })
            case !category:
                return res.status(500).send({ error: 'Category is required' })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: 'Photo is required and should be less than 1mb' })
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: "Car Created Succesfully",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating cars",
        })
    }
}

export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: 1 })
        res.status(200).send({
            success: true,
            total: products.length,
            message: 'All cars',
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false,
            message: 'Error in getting cars',
            error: error.message
        })
    }
};

export const singleProductController = async (req, res) => {
    try {
        const products = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category")
        if (products) {
            res.status(200).send({
                success: true,
                message: "Successfully find the car",
                products,
            })
        } else {
            res.status(200).send({
                success: true,
                message: "Cannot find the car",
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in finding car',
            error,
        })
    }
}

export const getPhotoController = async (req, res) => {
    try {
        const products = await productModel.findById(req.params.id).select("photo");
        if (products.photo.data) {
            res.set('Content-type', products.photo.contentType)
            return res.status(200).send(products.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in finding image",
            error
        })
    }
}

export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id).select("-photo")
        res.status(200).send({
            success: true,
            message: "Successfully deleted"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in deleting car",
            error,
        })
    }
}

export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category } = req.fields
        const { photo } = req.files
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' })
            case !description:
                return res.status(500).send({ error: 'Description is required' })
            case !price:
                return res.status(500).send({ error: 'Price is required' })
            case !category:
                return res.status(500).send({ error: 'Category is required' })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: 'Photo is required and should be less than 1mb' })
        }

        const products = await productModel.findByIdAndUpdate(
            req.params.id,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: "Producted Updateted Succesfully",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Updating",
            error,
        })
    }
}

export const carFilterController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args)
        res.status(200).send({
            success: true,
            products
        });
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in filter",
            error
        })
    }
}

export const carCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            total
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Error in car count",
            error,
            success: false
        })
    }
}

export const carListController = async (req, res) => {
    try {
        const perPage = 4
        const Page = req.params.page ? req.params.page : 1
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((Page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error",
            error
        })
    }
}

export const searchCarController = async (req, res) => {

}