import {
    configureStore,
    getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
    useDispatch as useDispatchBase,
    useSelector as useSelectorBase,
    TypedUseSelectorHook
} from 'react-redux';

import * as market from '@aventura-modules/market/state';

// Main Store Initialization

const middleware = [
    ...getDefaultMiddleware()
];

const store = configureStore({
    reducer: {
        market: market.reducer
    },
    middleware
});


type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// Hooks
const useDispatch = () => useDispatchBase<AppDispatch>();
const useSelector: TypedUseSelectorHook<RootState> = useSelectorBase;

export {
    store,
    RootState,
    AppDispatch,
    useDispatch,
    useSelector
}