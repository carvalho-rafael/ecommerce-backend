import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import path from 'path';
import 'dotenv/config';

import routes from './routes';

mongoose.connect('mongodb://admin:admin@localhost:27017/eshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    authSource: 'admin',
});

const app = express();

app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, '..', 'images')));

app.use(routes);

app.listen(3003, () => console.log('done!'));
