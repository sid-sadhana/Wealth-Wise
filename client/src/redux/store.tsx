import { configureStore } from '@reduxjs/toolkit';
import { signupReducer, uniUsernameReducer } from './reducers';

const store = configureStore({
  reducer: {
    signup: signupReducer,
    uniUsername: uniUsernameReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
