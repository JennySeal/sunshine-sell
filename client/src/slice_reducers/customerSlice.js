import {createSlice} from '@reduxjs/toolkit';

export const customerSlice = createSlice({
    name: 'customer',
    initialState: {data: undefined,
                   isLoading: true,
                   isLoggedin: false,
                   isError: false
                },
    reducers: {
        talkingToCustomerDb:(state) => {
            return {
                ...state.customer,
                isLoading: true,
                isLoggedin: false,
                isError: false,
            }
        },
        talkedToCustomerDb: (state, action) => {
        return {
            ...state.customer,
            isLoading: false,
            isLoggedin: true, 
            isError: false,
            data: action.payload
            }
        },  
        talkingToCustomerDbFailed: (state, action) => {
            return {
                ...state,
                isLoading: false,
                isLoggedin: false,
                isError: true,
            }        
        },
        loggedOutOfCustomerDb: (state, action) => {
            return {
                ...state.customer,
                isLoading: false,
                isLoggedin: false, 
                isError: false,
                data: action.payload
                }
            },  
     
    }
})


export const selectCustomer = state => state.customer;
export const {talkingToCustomerDb, talkedToCustomerDb, talkingToCustomerDbFailed, loggedOutOfCustomerDb} = customerSlice.actions;
export default customerSlice.reducer;