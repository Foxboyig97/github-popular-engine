import { configureStore } from '@reduxjs/toolkit';
import appRducer from '../features/app/appSlice'
import authorRducer from '../features/popular/battleSlice';
import popularRducer from '../features/popular/popularSlice';

const store = configureStore({
    reducer: {
        app: appRducer,
        popular: popularRducer,
        author: authorRducer
    },
});
export default store