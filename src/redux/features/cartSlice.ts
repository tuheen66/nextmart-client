import { IProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CartProduct extends IProduct {
  orderQuantity: number;
}

interface InitialState {
  products: CartProduct[];
  city: string;
  shippingAddress: string;
}

const initialState: InitialState = {
  products: [],
  city: "",
  shippingAddress: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      //* check if the order item is included in the action.payload
      const productToAdd = state.products.find(
        (product) => product._id === action.payload._id
      );

      //* if the item is included in action.payload then add 1
      if (productToAdd) {
        productToAdd.orderQuantity += 1;
        return;
      }

      //* if the item is not included in action.payload then add an extra field 'orderQuantity' with value 1 with action.payload
      state.products.push({ ...action.payload, orderQuantity: 1 });
    },

    //* increasing order quantity by 1 ==>> click on '+' button in cartProductCard
    incrementOrderQuantity: (state, action) => {
      const productToIncrement = state.products.find(
        (product) => product._id === action.payload
      );
      if (productToIncrement) {
        productToIncrement.orderQuantity += 1;
        return;
      }
    },

    //* decreasing order quantity by 1 ==>> click on '-' button in cartProductCard
    decrementOrderQuantity: (state, action) => {
      const productToIncrement = state.products.find(
        (product) => product._id === action.payload
      );
      if (productToIncrement && productToIncrement.orderQuantity > 1) {
        productToIncrement.orderQuantity -= 1;
        return;
      }
    },

    //* remove product from cart ==>> click on trash button in cartProductCard
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },

    updateCity: (state, action) => {
        state.city = action.payload;

      },
      updateShippingAddress: (state, action) => {
        state.shippingAddress = action.payload;
      },

      clearCart: (state) => {
        state.products = [];
        state.city = "";
        state.shippingAddress = "";
      },
  },
});

//*products

export const orderedProductsSelector = (state: RootState) => {
  return state.cart.products;
};

//! arranging product info according to the backend requirement using 'map'
export const orderSelector = (state: RootState) => {
    return {
      products: state.cart.products.map((product) => ({
        product: product._id,
        quantity: product.orderQuantity,
        color: "White",
      })),
      shippingAddress: `${state.cart.shippingAddress} - ${state.cart.city}`,
      paymentMethod: "Online",
    };
  };

//* Payment
//! calculating subtotal
export const subTotalSelector = (state: RootState) => {
  return state.cart.products.reduce((acc, product) => {
    if (product.offerPrice) {
      return acc + product.offerPrice * product.orderQuantity;
    } else {
      return acc + product.price * product.orderQuantity;
    }
  }, 0);
};

export const grandTotalSelector = (state: RootState) => {
    const subTotal = subTotalSelector(state);
    const shippingCost = shippingCostSelector(state);
  
    return subTotal + shippingCost;
  };

//! calculating shipping cost

export const shippingCostSelector = (state: RootState) => {
    if (
      state.cart.city &&
      state.cart.city === "Dhaka" &&
      state.cart.products.length > 0
    ) {
      return 60;
    } else if (
      state.cart.city &&
      state.cart.city !== "Dhaka" &&
      state.cart.products.length > 0
    ) {
      return 120;
    } else {
      return 0;
    }
  };



//* Address

export const citySelector = (state: RootState) => {
    return state.cart.city;
  };
  
  export const shippingAddressSelector = (state: RootState) => {
    return state.cart.shippingAddress;
  };

export const {
  addProduct,
  incrementOrderQuantity,
  decrementOrderQuantity,
  removeProduct,
  updateCity,
  updateShippingAddress,
  clearCart
  
} = cartSlice.actions;
export default cartSlice.reducer;
