// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   cartItems: localStorage.getItem("cartItems")
//     ? JSON.parse(localStorage.getItem("cartItems"))
//     : [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const item = action.payload;
//       const existItmes = state.cartItems.find((x) => x._id === item._id);
//       if (existItmes) {
//         state.cartItems = state.cartItems.map((x) =>
//           x._id === item._id ? item : x,
//         );
//       } else {
//         state.cartItems = [...state.cartItems, item];
//       }
//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//     },
//     removeFromCart: (state, action) => {
//       const itemId = action.payload;
//       state.cartItems = state.cartItems.filter((x) => x._id != itemId);
//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//     },
//     clearCart:(state)=>{
//         state.cartItems = [];
//         localStorage.removeItem('cartItems');
//     }
//   },
// });

// export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;
// export default cartSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: (() => {
    try {
      const items = localStorage.getItem('cartItems');
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.warn('Failed to parse cartItems from localStorage:', error);
      localStorage.removeItem('cartItems');
      return [];
    }
  })(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      if (!Array.isArray(state.cartItems)) {
        state.cartItems = [];
      }
      const existItem = state.cartItems.find((x) => x.productId === item.productId);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.productId === existItem.productId ? item : x
        );
      } else {
        state.cartItems.push(item);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      if (!Array.isArray(state.cartItems)) {
        state.cartItems = [];
      }
      state.cartItems = state.cartItems.filter((x) => x.productId !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;