import dotenv from 'dotenv';
const { NODE_ENV } = process.env;

if (NODE_ENV === 'prod') {
    dotenv.config();
} else {
    const envFile = `.env.${NODE_ENV}`;
    dotenv.config({path: envFile});
}

import App from './app';

const app = new App();

app.listen();