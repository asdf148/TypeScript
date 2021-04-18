import express, {Request, response, NextFunction}from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import dotenv from 'dotenv';
import ejs from 'ejs';
dotenv.config({path: path.join(__dirname, '.env')});
import router from './api';

import connect from "./models";

const app: express.Application = express();

app.set('port',process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
connect();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', router());

app.listen(app.get("port"), () =>{
  console.log(`server running on port ${app.get("port")}`);
})