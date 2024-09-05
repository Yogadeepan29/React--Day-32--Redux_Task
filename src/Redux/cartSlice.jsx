import { createSlice } from "@reduxjs/toolkit";
import products from "../data/products";

// Initial state of the cart
const initialState = {
  cartData: products,
  subtotal: 0,
  quantities: {},
  isCustoms: {},
};

// Create a slice for the cart
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Initialize quantities for each product when the component mounts
    initializeQuantities: (state) => {
      Object.keys(state.cartData).forEach((id) => {
        state.quantities[id] = 1;
        state.isCustoms[id] = false;
      });
    },
    // Handle select change event for quantity selector
    handleSelectChange: (state, action) => {
      const { id, value } = action.payload;
      const product = state.cartData[id];
      if (value === "10+") {
        state.isCustoms[id] = true;
        state.quantities[id] = Math.min(product.stock, 10);
      } else {
        state.quantities[id] = Math.min(
          Math.max(parseInt(value, 10), 1),
          product.stock
        );
        state.isCustoms[id] = false;
      }
    },
    // Handle input change event for custom quantity input
    handleInputChange: (state, action) => {
      const { id, value } = action.payload;
      const product = state.cartData[id];
      state.quantities[id] = Math.max(
        Math.min(parseInt(value, 10), product.stock),
        1
      );
    },
    // Remove an item from the cart
    removeItem: (state, action) => {
      delete state.cartData[action.payload];
      delete state.quantities[action.payload];
      delete state.isCustoms[action.payload];
    },
    // Calculate the subtotal of the cart
    calculateSubtotal: (state) => {
      let subtotal = 0;
      Object.keys(state.quantities).forEach((id) => {
        subtotal += state.quantities[id] * state.cartData[id].price;
      });
      state.subtotal = subtotal;
    },
  },
});
// Export the actions and reducer
export const {
  initializeQuantities,
  handleSelectChange,
  handleInputChange,
  removeItem,
  calculateSubtotal,
} = cartSlice.actions;

export default cartSlice.reducer;
