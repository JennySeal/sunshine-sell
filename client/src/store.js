import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import productsReducer from './slice_reducers/productsSlice';

export default configureStore({
    reducer: {
        products: productsReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    })
});