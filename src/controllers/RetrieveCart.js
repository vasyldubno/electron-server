import { Cart } from "../models/Cart.js"

export const RetrieveCart = async (req, res) => {
  const { id } = req.body
  const cart = await Cart.find({ id: id}, {_id: 0, __v: 0})
  res.json({ cart })
}