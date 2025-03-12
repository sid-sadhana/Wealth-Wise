import { configureStore } from '@reduxjs/toolkit';
import signupReducer from './reducers';

const store = configureStore({
  reducer: signupReducer, // Use a single colon for the key-value pair
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
