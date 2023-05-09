import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  restaurant: {
    id: null,
    imageUlr: null,
    title: null,
    rating: null,
    genre: null,
    address: null,
    short_description: null,
    dishes: null
  },
  temporaryRestaurant: {
    id: null,
    imageUlr: null,
    title: null,
    rating: null,
    genre: null,
    address: null,
    short_description: null,
    dishes: null
  },
  showConfirmationModal: false
}

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload
    },
    setTemporaryRestaurant: (state, action) => {
      state.temporaryRestaurant = action.payload
    },
    setShowConfirmationModal: (state, action) => {
      state.showConfirmationModal = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setRestaurant, setTemporaryRestaurant, setShowConfirmationModal } = restaurantSlice.actions
export const selectRestaurant = (state) => state.restaurant.restaurant
export const selectTemporaryRestaurant = (state) => state.restaurant.temporaryRestaurant
export const selectShowConfirmationModal = (state) => state.restaurant.showConfirmationModal

export default restaurantSlice.reducer
