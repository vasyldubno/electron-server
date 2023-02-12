import { Cart } from '../models/Cart.js'
import { v4 } from 'uuid'

export const CreateCart = async (req, res) => {
  try {
    const cart = await Cart.create({})
    res.json({ cart })
  } catch {}
} 