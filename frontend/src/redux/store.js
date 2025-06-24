import { configureStore } from "@reduxjs/toolkit";
import adminOrderReducer from "./slices/adminOrderSlice";
import adminProductReducer from "./slices/adminProductSlice";
import adminReducer from "./slices/adminSlice";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";
import orderReducer from "./slices/orderSlice";
import productsReducer from "./slices/productsSlide";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
    admin: adminReducer,
    adminProducts: adminProductReducer,
    adminOrders: adminOrderReducer,
  },
});

export default store;
