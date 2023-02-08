import {Product} from '../models/Product.js'

export const getCategories = async () => {
  const categories = await Product.find({}, {category: 1, _id: 0})
  const arr = []
  categories.forEach(item => {
    arr.push(item.category)
  })
  return Array.from(new Set(arr))
}