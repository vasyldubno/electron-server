import Stripe from 'stripe'
import { Order } from '../models/Order.js'

export const checkout = async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const customerData = req.body.customerData
    const products = req.body.products
    const total = req.body.total

    const order = await Order.create(
      {
        amount: total,
        completed: false,
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        email: customerData.email,
        phone: customerData.phone,
        country: customerData.country,
        state: customerData.state,
        city: customerData.city,
        address: customerData.address,
        items: products.map(item => ({ name: item.name, quantity: item.quantity}))
      }
    )

    const lineItems = products.map(item => {
      return {
        quantity: item.quantity,
        price_data: {
          currency: 'USD',
          product_data: {
            name: item.name
          },
          unit_amount: Number((item.variants[0].price * 100).toFixed(0))
        }
      }
    })
  
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: customerData.email,
      success_url: 'http://localhost:3000/order/confirmed',
      cancel_url: 'http://localhost:3000?cancel',
      line_items: lineItems
    })
    res.json({ 
      url: session.url, 
      orderId: order.orderId 
    })
  } catch(error) {
    console.log(error.message) 
  }
}