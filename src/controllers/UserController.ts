import { Request, Response } from 'express';

import User from '../models/User';

export default {
    async store(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400);
        }

        try {
            const newUser = await User.create({
                email, password,
            });
            return res.status(201).json(newUser);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
};
