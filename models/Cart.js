import mongoose from "mongoose";
import { v4 } from 'uuid'

const CartSchema = new mongoose.Schema({
  favoriteItem: {
    type: [],
    default: []
  },
  buyItem: {
    type: [],
    default: []
  },
  id: {
    type: String,
    default: `${v4()}:${new Date().getTime()}`
  }
})

export const Cart = mongoose.model('Cart', CartSchema)