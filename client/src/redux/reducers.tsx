import { createReducer } from '@reduxjs/toolkit';
import {
  SET_SIGNUP_USERNAME,
  SET_SIGNUP_PASSWORD,
  SET_SIGNUP_PROGRESS,
  SET_UNI_USERNAME
} from './actions';

export interface SignupState {
  username: string;
  password: string;
  progress: number;
}

export interface UniUsernameState {
  username: string;
}

const initial_signup: SignupState = {
  username: "",
  password: "",
  progress: 0
};

const uni_username: UniUsernameState = {
  username: ""
};

export const signupReducer = createReducer(initial_signup, (builder) => {
  builder
    .addCase(SET_SIGNUP_USERNAME, (state, action) => {
      state.username = action.payload;
    })
    .addCase(SET_SIGNUP_PASSWORD, (state, action) => {
      state.password = action.payload;
    })
    .addCase(SET_SIGNUP_PROGRESS, (state, action) => {
      state.progress = action.payload;
    });
});

export const uniUsernameReducer = createReducer(uni_username, (builder) => {
  builder.addCase(SET_UNI_USERNAME, (state, action) => {
    state.username = action.payload;
  });
});
