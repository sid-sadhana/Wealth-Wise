import { createAction } from '@reduxjs/toolkit';

export const SET_SIGNUP_USERNAME = createAction<string>('SET_SIGNUP_USERNAME');
export const SET_SIGNUP_PASSWORD = createAction<string>('SET_SIGNUP_PASSWORD');
export const SET_SIGNUP_PROGRESS = createAction<number>('SET_SIGNUP_PROGRESS');
export const SET_UNI_USERNAME = createAction<string>('SET_UNI_USERNAME');
