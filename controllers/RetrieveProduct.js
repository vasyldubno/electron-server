import { Product } from "../models/Product.js"

export const RetrieveProduct = async (req, res) => {
  const product = await Product.findOne({ productId: req.body.product_id }, {_id: 0, __v: 0})
  res.json({ product })
}