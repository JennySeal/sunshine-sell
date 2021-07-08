import {createSlice} from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {data: undefined,
                   isLoading: false,
                   isLoggedin: false,
                   isError: false
                },
    reducers: {
        addingUserToDb:(state) => {
            return {
                ...state.login,
                isLoading: true,
                isLoggedin: false,
                isError: false,
            }
        },
        addedUserToDb: (state, action) => {
        return {
            ...state.login,
            isLoading: false,
            isLoggedin: true, 
            isError: false,
            data: action.payload
            }
        },  
        addUserToDbFailed: (state, action) => {
            return {
                ...state,
                isLoading: false,
                isLoggedin: false,
                isError: true,        
        } 
        },
}})


export const selectLogin = state => state.login;
export const {addingUserToDb, addUserToDb, addUserToDbFailed} = loginSlice.actions;
export default loginSlice.reducer;