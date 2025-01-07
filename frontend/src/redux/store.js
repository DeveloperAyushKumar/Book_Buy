import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './features/cart/cart.js'
export const store=configureStore({

    reducer:{
        cart:cartReducer,


    }
})
