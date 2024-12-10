// redux/reducers.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state structure
interface SignUpState {
  username: string;
  password: string;
}

const initialState: SignUpState = {
  username: '',
  password: '',
};

// Create the slice
const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setSignUpUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setSignUpPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
  },
});

// Export actions and reducer
export const { setSignUpUsername, setSignUpPassword } = signUpSlice.actions;
export const signUpReducer = signUpSlice.reducer;
