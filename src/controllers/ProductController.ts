import { Request, Response } from 'express';

import Product from '../models/Product';

export default {
    async create(req: Request, res: Response): Promise<Response> {
        const {
            name,
            image,
            description,
            price,
            amount,
            category,
        } = req.body;

        if (!name || !description) {
            return res.status(400);
        }
        try {
            const newUser = await Product.create({
                name,
                image,
                description,
                price,
                amount,
                category,
            });
            return res.status(201).json(newUser);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async index(req: Request, res: Response): Promise<Response> {
        const products = await Product.find({}).populate('category');

        return res.status(200).json(products);
    },
};
