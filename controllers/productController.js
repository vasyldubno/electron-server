import { Cart } from "../models/Cart.js"

export class productController {
  constructor() {}
  static async deleteItemCart(req, res) {
    const id = req.body.id
    const productId = req.body.product_id

    const cart = await Cart.findOne({ id }, { _id: 0, __v: 0 })
    let buyItem = cart.buyItem
    buyItem = buyItem.filter(item => item.productId !== productId)

    const response = await Cart.updateOne(
      { id },
      {
        $set: {
          "buyItem": buyItem
        }
      }
    )

    const updatedCart = await Cart.findOne({ id }, { _id: 0, __v: 0 })

    if(!response) {
      res.status(404).json({ error: "item don't deleted"})
    } else {
      res.json({ result: updatedCart })
    }
  }
}