import { Order } from "../models/Order.js";

export class orderController {
  constructor() {}
  static async updateOrder(req, res) {
    try {
      const orderId = req.body.orderId
      // console.log('updateOrder', cartId)

      await Order.updateOne(
        { orderId },
        { $set: {
          "completed": true
        }}
      )

      res.json({ message: 'Success'})
    } catch (error) {
      console.log(error)
    }
  }
}