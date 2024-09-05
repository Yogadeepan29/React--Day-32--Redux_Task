import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Create a Redux store with the cart reducer
export const store = configureStore({
  reducer: {
     // The cart reducer is responsible for managing the cart state
    cart: cartReducer,
  },
});
