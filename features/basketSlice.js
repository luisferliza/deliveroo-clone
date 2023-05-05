import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: []
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      )
      const newBasket = [...state.items]
      if (index >= 0) {
        // The item exists in the basket... remove it
        newBasket.splice(index, 1)
      } else {
        console.warn(
                `Can't remove product (id: ${action.payload.id}) as its not in the basket!`
        )
      }
      state.items = newBasket
    }

  }
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions
export const selectBasketItems = (state) => state.basket.items
export const selectBasketTotal = (state) => state.basket.items.reduce((total, item) => total + item.price, 0)
export const selectBasketItemsWithId = (state, id) =>
  state.basket.items.filter((item) => item.id === id)

export default basketSlice.reducer
