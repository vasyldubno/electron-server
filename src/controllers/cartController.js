import { Cart } from '../models/Cart.js'

export class cartController {
  constructor() {}
  static async deleteAllBuyItems(req, res) {
    try {
      const cartId = req.body.cartId
      const cart = await Cart.updateOne(
        { id: cartId },
        { $set: {
          "buyItem": []
        }}
      )
      res.json({ message: "Successfull delete all buy items"})
    } catch(error) {
      console.log(error)
    }
  }
}