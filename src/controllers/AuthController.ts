import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../models/User';

export default {
    async authenticate(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).exec();

        if (!user) {
            return res.sendStatus(404);
        }

        const isValidPassword = await bcrypt.compare(password, user.password as string);
        if (!isValidPassword) {
            return res.sendStatus(401);
        }

        const secret = process.env.SECRET as string;
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1d' });

        user.password = undefined;
        // eslint-disable-next-line no-underscore-dangle
        user.__v = undefined;

        return res.status(200).json({
            user,
            token,
        });
    },
};
