import {configureStore} from '@reduxjs/toolkit';

const middleware = [

];

const store = configureStore({
    reducer: {},
    middleware
});

export {
    store
}