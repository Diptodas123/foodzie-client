import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import { injectDispatch } from '@/lib/apiClient';

const store = configureStore({
    reducer: {
        auth: authReducer,
    }
});

// Inject the store's dispatch function into our API client for use in interceptors
injectDispatch(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;
export type AppSelector = ReturnType<typeof store.getState>;

export default store;
