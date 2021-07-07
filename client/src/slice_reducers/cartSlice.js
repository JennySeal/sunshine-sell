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
    })


export const selectCart = state => state.cart;
export const {addProductToCart, removeProductFromCart} = cartSlice.actions;
export default cartSlice.reducer;