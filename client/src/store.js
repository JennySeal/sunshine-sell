import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import productsReducer from './slice_reducers/productsSlice';
import cartReducer from './slice_reducers/cartSlice';

export default configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    })
});