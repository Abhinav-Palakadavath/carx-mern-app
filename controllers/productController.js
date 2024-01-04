import productModel from "../models/productModel";
import fs from 'fs'

export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, } = req.fields
        const { photo } = req.files
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' })
            case !description:
                return res.status(500).send({ error: 'Description is required' })
            case !price:
                return res.status(500).send({ error: 'Price is required' })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: 'Photo is required and should be less than 1mb' })
        }

        const products = new productModel({ ...req.fields, slug: slugify() })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating cars",
        })
    }
}

