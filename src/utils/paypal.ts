import { stringify } from 'querystring';
import axios from 'axios';

interface OAuthResponse {
    // eslint-disable-next-line camelcase
    access_token: string
}

interface OrderResponse {
    id: string
}

class Paypal {
    async authorize(): Promise<OAuthResponse> {
        const PAYPAL_CLIENT = process.env.PAYPAL_CLIENT_ID;
        const PAYPAL_SECRET = process.env.PAYPAL_CLIENT_SECRET;

        const PAYPAL_OAUTH_API = 'https://api.sandbox.paypal.com/v1/oauth2/token/';
        const basicAuth = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`).toString('base64');

        const auth = await axios.post(PAYPAL_OAUTH_API,
            stringify({ grant_type: 'client_credentials' }),
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${basicAuth}`,
                },
            });
        return auth.data;
    }

    async getOrder(orderData: any): Promise<OrderResponse> {
        const PAYPAL_ORDER_API = 'https://api.sandbox.paypal.com/v2/checkout/orders/';

        const user = await this.authorize();
        const order = await axios.post(PAYPAL_ORDER_API, orderData, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${user.access_token}`,
            },
        }).catch((error) => {
            throw new Error(error);
        });

        return order.data;
    }
}

export default new Paypal();
