import { Request, Response } from 'express'

export const sellerPage = (req: Request, res: Response) => {
    res.render('seller', { title: "Seller" })
}