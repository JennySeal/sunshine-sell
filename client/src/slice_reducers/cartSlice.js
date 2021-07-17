import {createSlice} from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],                
    reducers: {
        addProductToCart:(state,action) => {
            state.push(action.payload)
        },
        removeProductFromCart:(state, action) => 
                state.filter(product => action.payload.product_id !== product.product_id)
         },
         emptyCartForSale:(state, action) => {
            console.log(action.payload)
        },
     })


export const selectCart = state => state.cart;
export const {addProductToCart, removeProductFromCart, emptyCartForSale} = cartSlice.actions;
export default cartSlice.reducer;