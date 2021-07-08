import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import productsReducer from './slice_reducers/productsSlice';
import cartReducer from './slice_reducers/cartSlice';
import loginReducer from './slice_reducers/loginSlice';

export default configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        login: loginReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    })
});