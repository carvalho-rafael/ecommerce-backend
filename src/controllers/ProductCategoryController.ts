import { Request, Response } from 'express';

import ProductCategory from '../models/ProductCategory';

export default {
    async create(req: Request, res: Response): Promise<Response> {
        const {
            name,
            description,
        } = req.body;

        if (!name || !description) {
            return res.status(400);
        }
        const newUser = await ProductCategory.create({
            name,
            description,
        });

        return res.status(201).json(newUser);
    },

    async index(req: Request, res: Response): Promise<Response> {
        const products = await ProductCategory.find({});

        return res.status(200).json(products);
    },
};
