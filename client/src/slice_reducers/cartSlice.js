import {createSlice} from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],                
    reducers: {
        addProductToCart:(state,action) => {
            state.push(action.payload)
        }}})


export const selectCart = state => state.cart;
export const {addProductToCart} = cartSlice.actions;
export default cartSlice.reducer;