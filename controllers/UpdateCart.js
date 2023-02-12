import { Cart } from "../models/Cart.js";

export const UpdateCart = async (req, res) => {
  try {
    const id = req.body.id
    const payload = req.body.payload 

    const cart = await Cart.findOne({ id }, {_id: 0, __v: 0})

    if(payload.buyItem) {
      let response
      if(cart.buyItem.length === 0) {
        response = await Cart.updateOne(
          { id },
          { $set: {
            "buyItem": [payload.buyItem]
          }}
        ) 
      }
      
      
      if(cart.buyItem.length > 0) {
        let newArray = []
        if (cart.buyItem.some(item => item.productId === payload.buyItem.productId)) {
          const filterItem = cart.buyItem.find(item => item.productId === payload.buyItem.productId)
          filterItem.quantity = payload.buyItem.quantity
          newArray.push(filterItem)
          const notSelectedItem = cart.buyItem.filter(item => item.productId !== payload.buyItem.productId)
          if(notSelectedItem.length > 0) {
            newArray.push(...notSelectedItem)
          }
        }

        if (cart.buyItem.every(item => item.productId !== payload.buyItem.productId)) {
          newArray.push(...cart.buyItem)
          newArray.push(payload.buyItem)
        }

        console.log('newArray', newArray);
        
        response = await Cart.updateOne(
              { id },
              { $set: {
                  "buyItem": newArray
                } 
              }
        )
      }

      const updatedCart = await Cart.findOne(
          { id },
          { _id: 0, __v: 0 }
        )

        if(response) {
          res.json({ result: updatedCart })
        } else {
          res.sendStatus(400).json({ message: "Cart don't update" })
        }
    }
    
    if (payload.favoriteItem) {
        let newFavoriteItem = [...cart.favoriteItem]
        if(newFavoriteItem.includes(payload.favoriteItem)) {
          newFavoriteItem = newFavoriteItem.filter(item => item !== payload.favoriteItem)
        } else {
          newFavoriteItem.push(payload.favoriteItem)
        }
        const response = await Cart.updateOne(
          { id },
          { $set: {
            favoriteItem: newFavoriteItem
            }
          }
        )
        const updatedCart = await Cart.findOne(
          { id },
          { _id: 0, __v: 0 }
        )

        if(response) {
          res.json({ result: updatedCart })
        } else {
          res.sendStatus(400).json({ message: "Cart don't update" })
        }
        console.log('newFavoriteItem',newFavoriteItem)
        console.log('payload.favoriteItem', payload.favoriteItem)
    }

    // const { favoriteItem } = await Cart.findOne({ id })
    // const newFavoriteItem = [...favoriteItem]
    // if(newFavoriteItem.includes(payload)) {
    //   const findIndexItem = () =>
		// 		newFavoriteItem.findIndex((item) => item === payload)
		// 	newFavoriteItem.splice(findIndexItem(), 1)
    // } else {
    //   newFavoriteItem.push(payload)
    // }
    // const response = await Cart.updateOne({ id },{ favoriteItem: newFavoriteItem })

    // const updatedCart = await Cart.findOne({ id }, { _id: 0, __v: 0 })

    // if(response) {
    //   res.json({ updatedCart })
    // } else {
    //   res.sendStatus(400).json({ message: "Cart don't update" })
    // }

    // res.json({ m: 'success' })
  }
  catch(e) {
    console.log(e);
  }
}