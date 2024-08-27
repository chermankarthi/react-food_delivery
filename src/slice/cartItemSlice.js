import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

const initialState = {
  data: data,
  items: data,
  addItems: [{}],
  addCartItem: [],
  totalPrice: 0,
  totalQuantity: 0,
  userDetails: [],
  orderId: 1,
  trackingOrder: [],
};

const CartItemSlice = createSlice({
  name: "cartItem",
  initialState,

  reducers: {
    handleOrderPendingTime(state, action) {
      state.userDetails.map((value) => {
        value.delpendingtime = value.delpendingtime - 1;
      });
    },
    handleOrderId(state, action) {
      state.orderId = state.orderId + 1;
    },

    handleUserDetails(state, action) {
      state.userDetails.unshift(action.payload);
    },
    handleSelectItem(state, action) {
      const item = state.items.find(
        (itemCart) => itemCart.id === action.payload
      );
      if (item) {
        item.quantity = item.quantity += 1;
      }
    },
    handleDeleteItem(state, action) {
      state.items = action.payload;
    },
    handleDecrementItem(state, action) {
      const item = state.items.find(
        (itemCart) => itemCart.id === action.payload
      );
      if (item) {
        item.quantity = item.quantity - 1;
      }
    },
    handleIncrementItem(state, action) {
      const item = state.items.find(
        (itemCart) => itemCart.id === action.payload
      );
      if (item) {
        item.quantity = item.quantity + 1;
      }
    },
    addToCart(state, action) {
      state.addCartItem.push(action.payload);
    },
    handleTotalQuantity(state, action) {
      state.totalQuantity = action.payload;
    },
    handleTotalPrice(state, action) {
      state.totalPrice = action.payload;
    },

    quantityIncrement(state, action) {
      const item = state.addCartItem.find(
        (itemCart) => itemCart.id === action.payload
      );
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.price;
      }
    },
    quantityDecrement(state, action) {
      const item = state.addCartItem.find(
        (itemCart) => itemCart.id === action.payload
      );
      if (item) {
        item.quantity = item.quantity - 1;
        item.totalPrice = item.quantity * item.price;
      }
      if (item.quantity <= 0) {
        state.addCartItem = state.addCartItem.filter(
          (filter) => filter.id !== action.payload
        );
      }
    },
    deleteItem(state, action) {
      state.addCartItem = state.addCartItem.filter(
        (filter) => filter.id !== action.payload
      );
      const item = state.items.find(
        (itemCart) => itemCart.id === action.payload
      );
      if (item) {
        item.quantity = 0;
      }
    },

    clearCart(state, action) {
      state.addCartItem = [];
      state.items = data;
    },
  },
});

export const {
  handleOrderPendingTime,
  handleOrderId,
  handleUserDetails,
  addToCart,
  handleDecrementItem,
  handleIncrementItem,
  handleDeleteItem,
  handleSelectItem,
  handleTotalPrice,
  handleTotalQuantity,
  quantityIncrement,
  quantityDecrement,
  deleteItem,
  clearCart,
} = CartItemSlice.actions;
export default CartItemSlice.reducer;
