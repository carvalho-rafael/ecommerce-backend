import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';

import 'dotenv/config';

mongoose.connect('mongodb://admin:admin@localhost:27017/eshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    authSource: 'admin',
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3003, () => console.log('done!'));
