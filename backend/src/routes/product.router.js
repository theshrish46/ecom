import express from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { addProduct } from '../controllers/product.controller.js';

const productRotuer = express.Router();

productRotuer.post('/add-product', upload.fields([
    {
        name: "image",
    },
    addProduct
]))


productRotuer.get('/test', (req, res) => {
    res.send('ok test');
})

export { productRotuer };