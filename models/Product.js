import mongoose from "mongoose";
import { v4 } from 'uuid'

const Item = new mongoose.Schema({
  variantId: String,
  price: {
      type: Number,
    },
    inventory: {
      available: {
        type: Number
      }
    },
    brand: {
      type: String
    },
    model: {
      type: String
    },
    screenSize: {
      type: String
    },
    hardDiskStotage: {
      type: String
    },
    RAM: {
      type: String
    },
    cpuModel: {
      type: String
    },
    OS: {
      type: String
    },
    color: {
      type: String
    },
    connectivityTechnology: {
      type: String
    },
    formFactor: String,
    images: {
      type: [String]
    }
})

const ProductSchema = new mongoose.Schema({
  name: String,
  productId: String,
  category: {
    type: String,
    enum: ['Headphone', 'Tablet', 'Laptop']
  },
  variants: [Item]
})

export const Product = mongoose.model('Product', ProductSchema)