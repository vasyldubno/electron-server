import { Order } from "../models/Order.js"

export const RetrieveOrders = async (req, res) => {
  const varinat = req.body.variant_id
  const orders = await Order.find({ variantId: varinat })
  res.json({ countOrders: orders.length })
}