import express from 'express';
import cors from 'cors';
import routes from './routes';

import 'dotenv/config';

const app = express();

app.use(cors());
app.use(routes);

app.listen(3003, () => console.log('done!'));
