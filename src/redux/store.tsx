// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { signUpReducer } from './reducers';

// Create Redux store with the reducer
const store = configureStore({
  reducer: {
    signUp: signUpReducer, // Your reducer goes here
  },
});

// Define the types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>; // The root state of the app
export type AppDispatch = typeof store.dispatch; // The dispatch function type

export default store;
