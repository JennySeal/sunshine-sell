import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    data: [],
    isEmpty: true,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,            
    reducers: {
        addProductToCart:(state,action) => {
            return {
                ...state,
            data: state.data.concat(action.payload),
            isEmpty: false,
            }
        },
        
        removeProductFromCart:(state, action) => {
            return {
            ...state.cart, 
            data: state.data.filter(product => action.payload.product_id !== product.product_id),
            isEmpty: (!state.data) ? true : false,

        }
    },
         
         emptyCartForSale:() => {
             return initialState 
        },
     }})


export const selectCart = state => state.cart;
export const {addProductToCart, removeProductFromCart, emptyCartForSale} = cartSlice.actions;
export default cartSlice.reducer;