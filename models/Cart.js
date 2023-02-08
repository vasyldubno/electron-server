import mongoose from "mongoose";
import { v4 } from 'uuid'

const CartSchema = new mongoose.Schema({
  id: {
    type: String,
    default: `cart_id_${v4()}`,
    unique: true
  },
  favoriteItem: {
    type: [],
    default: []
  },
  buyItem: {
    type: [],
    default: []
  }
})

export const Cart = mongoose.model('Cart', CartSchema)