import {createSlice} from '@reduxjs/toolkit';

export const productsSlice = createSlice({
    name: 'products',
    initialState: {data: undefined,
                   isLoading: true,
                   isError: false
                },
    reducers: {
        fetchingProducts:(state) => {
            return {
                ...state.products, 
                isLoading: true,
                isError: false,
            }
        },
        gotProducts: (state, action) => {
        return {
            ...state.products, 
            isLoading: false, 
            isError: false, 
            data: action.payload
            }
        },  
        fetchingProductsFailed: (state, action) => {
            return {
                ...state,
                isLoading: false,
                isError: true,        
        } 
        },
}})


export const selectProducts = state => state.products;
export const {fetchingProducts, gotProducts, fetchingProductsFailed} = productsSlice.actions;
export default productsSlice.reducer;