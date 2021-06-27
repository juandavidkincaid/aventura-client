import {
    createSlice,
    combineReducers
} from '@reduxjs/toolkit';

import {
    restaurants
} from '.';

// Market Module's main reducer

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