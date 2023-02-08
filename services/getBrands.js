import { Product } from '../models/Product.js'

export const getBrands = async () => {
  const categories = await Product.find({}, { 'variants': 1, _id: 0})
  const aaa = categories.map(item => item.variants.map(item => item.brand))
  const arr = [].concat(...aaa)
  return Array.from(new Set(arr))
}