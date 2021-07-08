import {createSlice} from '@reduxjs/toolkit';

export const customerSlice = createSlice({
    name: 'customer',
    initialState: {data: undefined,
                   isLoading: true,
                   isLoggedin: false,
                   isError: false
                },
    reducers: {
        addingCustomerToDb:(state) => {
            console.log('hello1')
            return {
                ...state.customer,
                isLoading: true,
                isLoggedin: false,
                isError: false,
            }
        },
        addedCustomerToDb: (state, action) => {
            console.log('hello2')
        return {
            ...state.customer,
            isLoading: false,
            isLoggedin: true, 
            isError: false,
            data: action.payload
            }
        },  
        addCustomerToDbFailed: (state, action) => {
            console.log('hello3')
            return {
                ...state,
                isLoading: false,
                isLoggedin: false,
                isError: true,        
        } 
        },
}})


export const selectCustomer = state => state.customer;
export const {addingCustomerToDb, addedCustomerToDb, addCustomerToDbFailed} = customerSlice.actions;
export default customerSlice.reducer;