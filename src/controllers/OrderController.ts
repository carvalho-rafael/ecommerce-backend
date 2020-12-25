import { Request, Response } from 'express';

import Paypal from '../utils/paypal';

export default {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async createOrder(_req: Request, res: Response) {
        const orderData = {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'BRL',
                    value: '130.00',
                },
            }],
        };
        const order = await Paypal.getOrder(orderData);
        res.status(200).json(order);
    },
};
