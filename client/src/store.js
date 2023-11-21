import { configureStore } from '@reduxjs/toolkit'
import addToCart from './features/addCart/addToCart'

export const store = configureStore({
  reducer: {
    
     valueCart: addToCart,
  },
})