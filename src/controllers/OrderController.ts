import { Request, Response } from 'express';

import Paypal from '../utils/paypal';

export default {
    async createOrder(_req: Request, res: Response): Promise<void> {
        const orderData = {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'BRL',
                    value: '30.00',
                },
                installment_options: [{
                    term: 2,
                    monthly_payment: {
                        currency_code: 'BRL',
                        value: '10.00',
                    },
                }],
            }],
        };
        const order = await Paypal.getOrder(orderData);
        res.status(200).json(order);
    },
};
