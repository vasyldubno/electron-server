import { Cart } from '../models/Cart.js'
import { v4 } from 'uuid'

export const CreateCart = async (req, res) => {
  try {
    const cart = await Cart.create({ id: `cart_id_${v4()}:${new Date().getTime()}` })
    res.json({ cart })
  } catch(e) {
    res.json({ message: e.message })
  }
} 