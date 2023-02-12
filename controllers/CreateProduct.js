import { Product } from "../models/Product.js"
import { v4 } from 'uuid'

export const CreateProduct = async (req, res) => {
  try {
    await Product.create({
    name: 'Apple MacBook Air',
    productId: `product_id_${v4()}`,
    category: "Laptop",
    variants: [
      {
        variantId: `variant_id_${v4()}`,
        price: 1098.99,
        inventory: {
          available: 32
        },
        brand: 'Apple',
        model: 'MacBook Air',
        color: 'gold',
        screenSize: '13 Inches',
        hardDiskStotage: '256 GB',
        cpuModel: 'Apple M1',
        RAM: '8 GB',
        OS: 'Mac OS',
        images: [
          'https://res.cloudinary.com/dtkchspyx/image/upload/v1674126483/shop/61GOpaQ3GWL._AC_SL1500__f1pzjr.jpg',
          'https://res.cloudinary.com/dtkchspyx/image/upload/v1674126495/shop/81HZAfCGZ5L._AC_SL1500__zoz6dh.jpg',
          'https://res.cloudinary.com/dtkchspyx/image/upload/v1674126572/shop/71hHMsqVzGL._AC_SL1500__zlgnjl.jpg'
        ]
      }
    ]
    })
    res.json({ message: 'product created'})    
  } catch (e) {
    console.log(e)
    res.json({ message: 'Error in creating product'})
  }
}