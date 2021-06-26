import {
    createSlice,
    combineReducers
} from '@reduxjs/toolkit';

import {
    restaurants
} from '.';

const reducer = combineReducers({
    restaurants: restaurants.reducer
});

const market = createSlice({
    name: 'market',
    initialState: {

    },
    reducers: {

    },
    extraReducers: {

    }
});

export {
    reducer
}