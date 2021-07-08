import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import productsReducer from './slice_reducers/productsSlice';
import cartReducer from './slice_reducers/cartSlice';
import customerReducer from './slice_reducers/customerSlice';

export default configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        customer: customerReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    })
});