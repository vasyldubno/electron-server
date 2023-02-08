import { Product } from "../models/Product.js"
import { getBrands } from "../services/getBrands.js"
import { getCategories } from "../services/getCategories.js"

export const FilterProducts = async (req, res) => {
  try { 
    let payload = req.body.payload
    
    const brands = await getBrands()
    const categories = await getCategories()
    const inventry = ['In stock','Out of stock']

    let brandsChecked = []
    let categoriesChecked = []
    let inventryChecked = []
    let search = ''

    payload.forEach(item => {
      if(brands.includes(item)) {
        brandsChecked.push(item)
      } else if(categories.includes(item)) {
        categoriesChecked.push(item)
      } else if(inventry.includes(item)) {
        inventryChecked.push(item)
      } else {
        search = item
      }
    })

    let i = { $gte: 1 }

    if(categoriesChecked.length === 0) {
      categoriesChecked = await getCategories() 
    }

    if(brandsChecked.length === 0) {
      brandsChecked = await getBrands()
    }

    if(inventryChecked.length === 0 || (inventryChecked.includes('In stock') && inventryChecked.includes('Out of stock'))) {
      i = { $gte: 0 }
    } else {
        inventryChecked.forEach(item => {
          if(item === 'In stock') {
            i = { $gte: 1 }
          } else if(item === 'Out of stock') {
            i = { $lt: 1 }
          } else {
            return
          }
        })
      }

    const result = await Product.find({ 
      $and: [
        {category: { $in: [...categoriesChecked]}}, 
        {'variants.brand': { $in: [...brandsChecked]}}, 
        {'variants.inventory.available': i },
        {'name': {
          $regex: new RegExp(search, 'i')
        }}
      ]
    })

    res.json({ result })
  } catch(e) {
    console.log(e)
  }
}