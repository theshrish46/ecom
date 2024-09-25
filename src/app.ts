import express, { Application, Request, Response } from 'express';
import cors from 'cors'
import path from 'path';
import bodyParser from 'body-parser'
require('dotenv').config()
import mongoose, { ConnectOptions } from 'mongoose';

import authRoute from './routes/auth.route'
import sellerRoute from './routes/seller.route'

const app: Application = express();

const MONGO_URL = process.env.MONGO_URL!

app.use(express.static(path.join(__dirname, '..', 'public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }))

try {
    mongoose.connect(MONGO_URL);
    console.log("CONNECTED TO DATABASE")
} catch (error) {
    console.log("Error ", error)
}



app.get('/', (req: Request, res: Response) => {
    res.render('index', { title: "Home" })
})


app.use('/auth', authRoute)

app.use('/seller', sellerRoute)



export default app;
