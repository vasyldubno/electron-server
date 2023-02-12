import { Product } from "../models/Product.js"

export const SearchProducts = async (req, res) => {
  const payload = req.body.payload
  const products = await Product.find({ name: { $regex: new RegExp(payload, 'i') } }, {_id: 0, __v: 0})
  res.json({ result: products }) 
}