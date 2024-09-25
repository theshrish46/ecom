import express from 'express'
import { sellerPage } from '../controllers/seller.controller'


const router = express.Router()

router.get('/', sellerPage)



export default router