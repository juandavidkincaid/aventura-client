import {
    createSlice,
    createAsyncThunk,
    PayloadAction
} from '@reduxjs/toolkit';

import { app } from '@aventura-core';

// Restaurants State, Reducer, Actions, Types, Fetching Definition

type RestaurantsInitialState = {
    restaurants: {
        id: string,
        name: string,
        instagramProfile: string,
        phone: string,
        image: {
            url: string,
            mime: string,
        },
        createdAt: string
        updatedAt: string
    }[]
    status: 'idle' | 'loading' | 'resolved' | 'rejected',
    error: string | null
}

const RestaurantsInitialState: RestaurantsInitialState = {
    restaurants: [],
    status: 'idle',
    error: null
};

const fetchRestaurants = createAsyncThunk<RestaurantsInitialState["restaurants"]>('market/restaurants/fetch/', async ()=>{
    const response = await app.api.get('/v1/market/restaurants/');
    return response.data;
});

const restaurants = createSlice({
    name: 'restaurants',
    initialState: RestaurantsInitialState,
    reducers: {},
    extraReducers: builder=>{
        builder.addCase(fetchRestaurants.pending, (state)=>{
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(fetchRestaurants.fulfilled, (state, action)=>{
            state.status = 'resolved';
            state.restaurants = action.payload;
        });
        builder.addCase(fetchRestaurants.rejected, (state, action)=>{
            state.status = 'rejected';
            state.error = action.error.message ?? null;
        });
    }
});

export {
    restaurants,
    fetchRestaurants
}