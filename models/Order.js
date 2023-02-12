import mongoose from "mongoose";
import { v4 } from 'uuid'

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    default: `order_${v4()}`
  },
  amount: {
    type: Number
  },
  completed: {
    type: Boolean
  },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  country: String,
  state: String,
  city: String,
  items: Array,
  address: String,
}, {
  timestamps: true
})

export const Order = mongoose.model('Order', OrderSchema)