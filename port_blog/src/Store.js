import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  allusersReducer,
  clearHistory,
  profileReducer,
  updateUserReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";
import {
  createProductReducer,
  getAllProductReducer,
  productDetailsReducer,
  updDelproductReducer,
} from "./reducers/productReducer";
import categoryReducer from "./reducers/categoryReducer";
import tagReducer from "./reducers/tagReducer";
import commentReducer from "./reducers/commentReducer";
import { cartReducer } from "./reducers/cartReducer";
import ThemeReducer from "./reducers/ThemeReducer";
const middleware = [thunk];
const reducer = combineReducers({
  Theme: ThemeReducer,
  user: userReducer,
  cart: cartReducer,
  allProducts: getAllProductReducer,
  category: categoryReducer,
  tags: tagReducer,
  comments: commentReducer,
  updateUser: updateUserReducer,
  clearHistory: clearHistory,
  allUsers: allusersReducer,
  userDetails: userDetailsReducer,
  //PRODUCTS
  products: createProductReducer,

  productDetails: productDetailsReducer,
  updDelProduct: updDelproductReducer,
});
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
