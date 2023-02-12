import {Product} from '../models/Product.js'

export const RetrieveProducts = async (req, res) => {
  const products = await Product.find({}, {_id: 0, __v: 0})
  res.json({ products })
}