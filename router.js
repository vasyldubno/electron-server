import { Router } from 'express'
import { cartController } from './controllers/cartController.js'
import { checkout } from './controllers/checkout.js'
import { CreateCart } from './controllers/CreateCart.js'
import { CreateProduct } from './controllers/CreateProduct.js'
import { FilterProducts } from './controllers/FilterProducts.js'
import { orderController } from './controllers/orderController.js'
import { productController } from './controllers/productController.js'
import { RetrieveCart } from './controllers/RetrieveCart.js'
import { RetrieveOrders } from './controllers/RetrieveOrders.js'
import { RetrieveProduct } from './controllers/RetrieveProduct.js'
import { RetrieveProducts } from './controllers/RetrieveProducts.js'
import { SearchProducts } from './controllers/SearchProducts.js'
import { UpdateCart } from './controllers/UpdateCart.js'
import { ApiError } from './services/apiError.js'

export const router = Router()

router.get('/', (req, res) => {
  return res.json({ message: 'ELECTRON SERVER'})
})
router.get('/api/createCart', CreateCart)
router.post('/api/retrieveCart', RetrieveCart)
router.post('/api/updateCart', UpdateCart)
router.post('/api/emptyCart', cartController.deleteAllBuyItems) 

router.post('/api/createProduct', CreateProduct)
router.post('/api/retrieveProduct', RetrieveProduct)
router.get('/api/retrieveProducts', RetrieveProducts)
router.post('/api/filterProducts', FilterProducts)
router.post('/api/searchProducts', SearchProducts)
router.post('/api/deleteProduct', productController.deleteItemCart)

router.post('/api/retrieveOrders', RetrieveOrders)

router.post('/api/checkout', checkout)
router.post('/api/updateOrder', orderController.updateOrder)