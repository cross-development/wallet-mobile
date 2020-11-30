//Core
import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
//Redux
import authActions from './authActions';

//User reducer
const user = createReducer(null, {
	[authActions.getCurrentUserSuccess]: (state, { payload }) => payload,
	[authActions.userSignUpSuccess]: (state, { payload }) => payload.user,
	[authActions.userSignInSuccess]: (state, { payload }) => payload.user,
	[authActions.userSighOutSuccess]: () => null,
});

//Token reducer
const token = createReducer(null, {
	[authActions.userSignUpSuccess]: (state, { payload }) => payload.token,
	[authActions.userSignInSuccess]: (state, { payload }) => payload.token,
	[authActions.userSighOutSuccess]: () => null,
});

//Error reducer
const error = createReducer(null, {
	[authActions.getCurrentUserFailure]: (state, { payload }) => payload,
	[authActions.userSignUpFailure]: (state, { payload }) => payload,
	[authActions.userSignInFailure]: (state, { payload }) => payload,
	[authActions.userSighOutFailure]: (state, { payload }) => payload,
});

export default combineReducers({
	user,
	token,
	error,
});
